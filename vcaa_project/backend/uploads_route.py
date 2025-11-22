# backend/uploads_route.py
import os
from flask import Blueprint, request, jsonify
from models import db, UploadedDocument, Payment
from datetime import datetime

uploads_bp = Blueprint("uploads_bp", __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@uploads_bp.route("/upload", methods=["POST"])
def upload_document():
    user_id = request.form.get("user_id")
    document_type = request.form.get("document_type")
    file = request.files.get("file")

    if not user_id or not document_type:
        return jsonify({"error": "user_id and document_type required"}), 400

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    filename = file.filename
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)

    upload = UploadedDocument(
        user_id=int(user_id),
        document_type=document_type,
        file_path=filename,
        verified=False,
        admin_approved=False
    )

    db.session.add(upload)
    db.session.commit()

    return jsonify({
        "message": "Uploaded successfully",
        "document": {
            "id": upload.id,
            "document_type": upload.document_type,
            "verified": upload.verified,
            "admin_approved": upload.admin_approved,
            "file_url": f"/uploads/{filename}"
        }
    }), 201


@uploads_bp.route("/list/<int:user_id>", methods=["GET"])
def list_documents(user_id):
    docs = UploadedDocument.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": d.id,
            "document_type": d.document_type,
            "uploaded_on": d.uploaded_on.strftime("%Y-%m-%d %H:%M:%S"),
            "verified": d.verified,
            "admin_approved": d.admin_approved,
            "file_url": f"/uploads/{d.file_path}"
        }
        for d in docs
    ])


# ---------------------------
# NEW: status endpoint: tells frontend where the user's application stands
# GET /api/uploads/status/<user_id>
# returns: { uploaded_count, approved_count, all_approved:bool, payment_paid:bool, last_payment }
# ---------------------------
@uploads_bp.route("/status/<int:user_id>", methods=["GET"])
def uploads_status(user_id):
    docs = UploadedDocument.query.filter_by(user_id=user_id).all()
    uploaded_count = len(docs)
    approved_count = sum(1 for d in docs if getattr(d, "admin_approved", False))
    all_approved = (uploaded_count > 0) and (approved_count == uploaded_count)

    # check payments
    payments = Payment.query.filter_by(user_id=user_id).order_by(Payment.created_at.desc()).all()

    # ACCEPT multiple statuses as "paid" so admin/student flows both work:
    # student payment: "success" (payment_route.pay_now)
    # admin confirmation: "received" (admin_routes.confirm_payment)
    # some places may use "paid" — include that too
    paid_statuses = {"success", "received", "paid"}
    payment_paid = any((p.status or "").lower() in paid_statuses for p in payments)

    last_payment = None
    if payments:
        last_payment = {
            "id": payments[0].id,
            "amount": payments[0].amount,
            "status": payments[0].status,
            "date": payments[0].created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

    return jsonify({
        "uploaded_count": uploaded_count,
        "approved_count": approved_count,
        "all_approved": all_approved,
        "payment_paid": payment_paid,
        "last_payment": last_payment
    }), 200
