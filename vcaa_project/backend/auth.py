# auth.py
import json
from flask import Blueprint, request, jsonify
from models import db, User

auth_bp = Blueprint("auth_bp", __name__)

# Load student master data
with open("data/students.json", "r") as f:
    students = json.load(f)


@auth_bp.route("/student-login", methods=["POST"])
def student_login():
    data = request.get_json()

    exam = data.get("exam")
    phone = data.get("phone")
    email = data.get("email")
    app_no = data.get("application_no")
    seat_no = data.get("seat_no")
    password = data.get("password")

    # 1️⃣ Match student in JSON
    matched_student = None
    for s in students:
        if (
            s["exam"] == exam
            and s["phone"] == phone
            and s["email"] == email
            and s["application_no"] == app_no
            and s["seat_no"] == seat_no
            and s["password"] == password
        ):
            matched_student = s
            break

    if not matched_student:
        return jsonify({"error": "Invalid Credentials"}), 401

    # 2️⃣ Check if this student exists in MySQL users table
    user = User.query.filter_by(email=matched_student["email"]).first()

    # 3️⃣ If not exists → create DB user
    if not user:
        user = User(
            username=matched_student["full_name"],
            full_name=matched_student["full_name"],
            email=matched_student["email"],
            password_hash=matched_student["password"],  # since mock login
            role="student"
        )
        db.session.add(user)
        db.session.commit()

    # 4️⃣ Return correct format to frontend
    response_student = dict(matched_student)
    response_student["id"] = user.id

    return jsonify({
        "token": "dummy_token_123",
        "student": response_student
    }), 200
