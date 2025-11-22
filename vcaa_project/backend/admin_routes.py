# backend/admin_routes.py
from flask import Blueprint, request, jsonify, current_app
from models import db, College, Admin, UploadedDocument, Payment, User, ApplicationStatus
from sqlalchemy import desc

admin_bp = Blueprint("admin_bp", __name__)

# ----------------------------
# ADMIN LOGIN
# ----------------------------
@admin_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "email and password required"}), 400

    admin = Admin.query.filter_by(email=email).first()

    if admin:
        if admin.password_hash != password:
            return jsonify({"error": "Invalid admin credentials"}), 401
        return jsonify({
            "message": "Admin login successful",
            "admin": {"id": admin.id, "email": admin.email, "full_name": admin.full_name}
        }), 200

    if email == "admin@example.com" and password == "admin123":
        return jsonify({
            "message": "Admin login successful",
            "admin": {"id": 0, "email": "admin@example.com", "full_name": "Demo Admin"}
        }), 200

    return jsonify({"error": "Invalid admin credentials"}), 401


# ============================================================
# GET DOCUMENTS
# ============================================================
@admin_bp.route("/documents", methods=["GET"])
def get_documents():
    docs = UploadedDocument.query.order_by(desc(UploadedDocument.uploaded_on)).all()
    result = []

    for d in docs:
        user = User.query.get(d.user_id)
        result.append({
            "id": d.id,
            "user_id": d.user_id,
            "user_name": getattr(user, "full_name", None) or getattr(user, "username", None) or "Unknown",
            "user_email": getattr(user, "email", None),
            "document_type": d.document_type,
            "file_path": d.file_path,
            "file_url": f"/uploads/{d.file_path}",
            "uploaded_on": d.uploaded_on.isoformat(),
            "verified": bool(d.verified),
            "admin_approved": bool(d.admin_approved)
        })

    return jsonify({"documents": result}), 200


# ============================================================
# APPROVE DOCUMENT
# ============================================================
@admin_bp.route("/documents/approve", methods=["POST"])
def approve_document():
    data = request.get_json() or {}
    doc_id = data.get("document_id")

    if not doc_id:
        return jsonify({"error": "document_id required"}), 400

    doc = UploadedDocument.query.get(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    doc.verified = True
    doc.admin_approved = True
    db.session.add(doc)

    app_status = ApplicationStatus.query.filter_by(user_id=doc.user_id).first()

    if not app_status:
        app_status = ApplicationStatus(
            user_id=doc.user_id,
            status="Documents Approved"
        )
        db.session.add(app_status)
    else:
        app_status.status = "Documents Approved"

    db.session.commit()
    return jsonify({"message": "Document approved"}), 200


# ============================================================
# GET PAYMENTS
# ============================================================
@admin_bp.route("/payments", methods=["GET"])
def admin_payments():
    payments = Payment.query.order_by(desc(Payment.created_at)).all()
    result = []

    for p in payments:
        user = User.query.get(p.user_id)
        result.append({
            "id": p.id,
            "user_id": p.user_id,
            "student_name": getattr(user, "full_name", None),
            "student_email": getattr(user, "email", None),
            "amount": p.amount,
            "status": p.status,
            "transaction_id": p.transaction_id,
            "created_at": p.created_at.isoformat()
        })

    return jsonify({"payments": result}), 200


# ============================================================
# CONFIRM PAYMENT (Important: KEEP ONLY THIS ONE)
# ============================================================
@admin_bp.route("/payments/confirm", methods=["POST"])
def confirm_payment():
    data = request.get_json() or {}
    payment_id = data.get("payment_id")

    if not payment_id:
        return jsonify({"error": "payment_id required"}), 400

    payment = Payment.query.get(payment_id)
    if not payment:
        return jsonify({"error": "Payment not found"}), 404

    # 🔥 KEY FIX: Standardize to "paid" so student sees it
    payment.status = "paid"
    db.session.add(payment)

    # update application status
    app_status = ApplicationStatus.query.filter_by(user_id=payment.user_id).first()
    if not app_status:
        app_status = ApplicationStatus(
            user_id=payment.user_id,
            status="Fee Paid - Admission Confirmed"
        )
        db.session.add(app_status)
    else:
        app_status.status = "Fee Paid - Admission Confirmed"

    db.session.commit()

    return jsonify({
        "message": "Payment confirmed",
        "payment_id": payment.id
    }), 200
