# app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db
from auth import auth_bp
from predictor import predictor_bp
from uploads_route import uploads_bp
from payment_route import payment_bp
from digilocker_route import digilocker_bp
from admin_routes import admin_bp
from eduway_chatbot import chatbot_bp

import os


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:Swami%402408@localhost/vcaa_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(predictor_bp, url_prefix="/api/predictor")
app.register_blueprint(uploads_bp, url_prefix="/api/uploads")
app.register_blueprint(payment_bp, url_prefix="/api/payments")
app.register_blueprint(digilocker_bp, url_prefix="/api/digilocker")
app.register_blueprint(admin_bp, url_prefix="/api/admin")
app.register_blueprint(chatbot_bp, url_prefix="/api/chat")

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
RECEIPT_FOLDER = os.path.join(os.path.dirname(__file__), "receipts")


@app.route("/uploads/<path:filename>")
def serve_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route("/receipts/<path:filename>")
def serve_receipt_file(filename):
    return send_from_directory(RECEIPT_FOLDER, filename)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("🚀 Backend running at http://localhost:5000")
    app.run(debug=True)
