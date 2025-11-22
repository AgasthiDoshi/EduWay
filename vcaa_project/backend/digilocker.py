# digilocker.py
from flask import Blueprint, jsonify, request, current_app

digilocker_bp = Blueprint("digilocker_bp", __name__)


@digilocker_bp.route("/auth", methods=["GET"])
def digilocker_auth():
    """
    Mock DigiLocker authentication API.
    In real implementation, redirect user to DigiLocker OAuth.
    """
    client_id = current_app.config.get("DIGILOCKER_CLIENT_ID")
    return jsonify({
        "message": "DigiLocker Auth Successful",
        "client_id": client_id
    }), 200


@digilocker_bp.route("/fetch", methods=["GET"])
def digilocker_fetch():
    """
    Mock fetch API: returns sample verified documents.
    """
    sample_documents = [
        {
            "document_type": "Aadhar Card",
            "document_number": "XXXX-YYYY-1234",
            "status": "verified"
        },
        {
            "document_type": "10th Marksheet",
            "document_number": "TS23456789",
            "status": "verified"
        }
    ]

    return jsonify({
        "message": "Documents fetched successfully",
        "documents": sample_documents
    }), 200

