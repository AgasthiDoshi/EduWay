# payment_route.py
from flask import Blueprint, jsonify, request, send_file
from models import db, Payment
from reportlab.pdfgen import canvas
from datetime import datetime
import os

payment_bp = Blueprint("payment_bp", __name__)

RECEIPT_FOLDER = os.path.join(os.path.dirname(__file__), "receipts")
os.makedirs(RECEIPT_FOLDER, exist_ok=True)

ADMISSION_FEE = 165650


# GET PAYMENT HISTORY
@payment_bp.route("/history/<int:user_id>", methods=["GET"])
def payment_history(user_id):
    payments = Payment.query.filter_by(user_id=user_id).order_by(Payment.id.desc()).all()

    return jsonify([
        {
            "id": p.id,
            "amount": p.amount,
            "date": p.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "receipt_url": f"/api/payments/receipt/{p.id}"
        }
        for p in payments
    ])


# THE CORRECT ROUTE NAME = /api/payments/pay
@payment_bp.route("/pay", methods=["POST"])
def pay_now():
    data = request.json
    user_id = data.get("user_id")

    payment = Payment(
        user_id=user_id,
        amount=ADMISSION_FEE,
        status="success",
        transaction_id=f"TXN{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )

    db.session.add(payment)
    db.session.commit()

    generate_pdf(payment)

    return jsonify({
        "message": "Payment successful",
        "receipt_url": f"/api/payments/receipt/{payment.id}"
    }), 200


def generate_pdf(payment):
    filename = f"receipt_{payment.id}.pdf"
    filepath = os.path.join(RECEIPT_FOLDER, filename)

    c = canvas.Canvas(filepath)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(150, 780, "EduWay Admission Fee Receipt")

    c.setFont("Helvetica", 12)
    c.drawString(50, 740, f"Receipt ID: {payment.id}")
    c.drawString(50, 720, f"Transaction ID: {payment.transaction_id}")
    c.drawString(50, 700, f"Amount Paid: ₹{payment.amount}")
    c.drawString(50, 680, f"Payment Status: Successful")
    c.drawString(50, 660, f"User ID: {payment.user_id}")
    c.drawString(50, 640, f"Date: {payment.created_at}")

    c.showPage()
    c.save()
    return filepath


@payment_bp.route("/receipt/<int:payment_id>")
def get_receipt(payment_id):
    filename = f"receipt_{payment_id}.pdf"
    filepath = os.path.join(RECEIPT_FOLDER, filename)
    return send_file(filepath, as_attachment=True)
