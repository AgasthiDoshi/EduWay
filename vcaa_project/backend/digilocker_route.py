from flask import Blueprint, jsonify, request
from models import db, UploadedDocument

digilocker_bp = Blueprint("digilocker_bp", __name__)

@digilocker_bp.route("/verify-documents/<int:user_id>", methods=["POST"])
def verify_documents(user_id):
    """
    One-click: verify all documents uploaded by the user.
    """
    docs = UploadedDocument.query.filter_by(user_id=user_id).all()

    if not docs:
        return jsonify({"error": "No documents uploaded"}), 404

    for d in docs:
        d.verified = True
        db.session.add(d)

    db.session.commit()

    return jsonify({"message": "All documents verified!"}), 200
