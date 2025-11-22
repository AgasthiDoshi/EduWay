# backend/predictor.py
import os
import pandas as pd
from flask import Blueprint, request, jsonify

predictor_bp = Blueprint("predictor_bp", __name__)

# ---------- LOAD DATA ONCE ----------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "data", "cutoffs.csv")

cutoff_df = None

try:
    print(f"📌 Predictor loading CSV from: {CSV_PATH}")
    cutoff_df = pd.read_csv(CSV_PATH)

    cutoff_df.columns = [c.strip().lower() for c in cutoff_df.columns]

    cutoff_df["closing_percentile"] = pd.to_numeric(
        cutoff_df["closing_percentile"], errors="coerce"
    )
    cutoff_df["closing_rank"] = pd.to_numeric(
        cutoff_df["closing_rank"], errors="coerce"
    )

    cutoff_df["city"] = cutoff_df["city"].fillna("")
    cutoff_df["course_name"] = cutoff_df["course_name"].fillna("")

    print(f"✅ cutoffs.csv loaded: {cutoff_df.shape}")
except Exception as e:
    print("❌ Error loading cutoffs.csv:", e)


# ---------- OPTIONS ENDPOINT ----------
# FIXED: This must be ONLY "/" so full URL is /api/predictor/options

@predictor_bp.route("/options", methods=["GET"])
def predictor_options():
    if cutoff_df is None or cutoff_df.empty:
        return jsonify({"regions": [], "branches": []}), 200

    regions = sorted(r for r in cutoff_df["city"].dropna().unique() if str(r).strip())
    branches = sorted(b for b in cutoff_df["course_name"].dropna().unique() if str(b).strip())

    return jsonify({
        "regions": ["All"] + regions,
        "branches": ["All"] + branches
    }), 200


# ---------- RUN PREDICTOR ----------
# FIXED: This must be ONLY "/run" so full URL is /api/predictor/run

@predictor_bp.route("/run", methods=["POST"])
def run_predictor():
    if cutoff_df is None or cutoff_df.empty:
        return jsonify({"error": "Cutoff data not loaded"}), 500

    data = request.get_json() or {}

    try:
        percentile = float(data.get("marks", 0))
    except:
        return jsonify({"error": "Invalid percentile"}), 400

    region = (data.get("region") or "All").strip()
    branch = (data.get("branch") or "All").strip()

    if percentile <= 0 or percentile > 100:
        return jsonify({"error": "Percentile must be between 0 and 100"}), 400

    df = cutoff_df.copy()
    df = df[df["closing_percentile"] <= percentile]

    if region != "All":
        df = df[df["city"].str.strip().str.lower() == region.lower()]

    if branch != "All":
        df = df[df["course_name"].str.strip().str.lower() == branch.lower()]

    if df.empty:
        return jsonify({
            "estimated_rank": None,
            "predictions": [],
            "message": "No colleges found for given filters."
        }), 200

    df = df.sort_values(by="closing_percentile", ascending=False)

    max_rank = cutoff_df["closing_rank"].max()
    estimated_rank = int(round((100 - percentile) / 100 * max_rank))

    top = df.head(50)

    predictions = []
    for _, row in top.iterrows():
        predictions.append({
            "college_name": row.get("institute_name", ""),
            "city": row.get("city", ""),
            "branch": row.get("course_name", ""),
            "closing_rank": int(row.get("closing_rank", 0)),
            "closing_percentile": float(row.get("closing_percentile", 0.0)),
        })

    return jsonify({
        "estimated_rank": estimated_rank,
        "predictions": predictions
    }), 200
