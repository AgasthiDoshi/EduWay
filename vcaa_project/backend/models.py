# models.py
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ====================================================
# USER MODEL
# ====================================================
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default="student")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    documents = db.relationship("UploadedDocument", back_populates="user", cascade="all, delete-orphan")
    notifications = db.relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    payments = db.relationship("Payment", back_populates="user", cascade="all, delete-orphan")
    applications = db.relationship("ApplicationStatus", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.email}>"


# ====================================================
# ADMIN MODEL
# ====================================================
class Admin(db.Model):
    __tablename__ = "admins"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_superadmin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Admin {self.email}>"


# ====================================================
# COLLEGE MODEL
# ====================================================
class College(db.Model):
    __tablename__ = "colleges"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    code = db.Column(db.String(50), unique=True)
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    description = db.Column(db.Text)
    website = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # RELATIONSHIPS
    courses = db.relationship("Course", back_populates="college", cascade="all, delete-orphan")
    applications = db.relationship("ApplicationStatus", back_populates="college")

    def __repr__(self):
        return f"<College {self.name}>"


# ====================================================
# COURSE MODEL
# ====================================================
class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey("colleges.id"), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    degree_type = db.Column(db.String(100))
    duration_years = db.Column(db.Integer)
    seats = db.Column(db.Integer)
    cutoff_score = db.Column(db.Float)

    # RELATIONSHIPS
    college = db.relationship("College", back_populates="courses")
    applications = db.relationship("ApplicationStatus", back_populates="course")

    def __repr__(self):
        return f"<Course {self.name}>"


# ====================================================
# UPLOADED DOCUMENTS MODEL
# ====================================================
class UploadedDocument(db.Model):
    __tablename__ = "uploaded_documents"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    document_type = db.Column(db.String(50), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    uploaded_on = db.Column(db.DateTime, default=datetime.utcnow)

    # NEW FIELDS
    verified = db.Column(db.Boolean, default=False)
    admin_approved = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="documents")

    def __repr__(self):
        return f"<UploadedDocument {self.id}>"



# ====================================================
# NOTIFICATIONS MODEL
# ====================================================
class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="notifications")

    def __repr__(self):
        return f"<Notification {self.title}>"


# ====================================================
# PAYMENTS MODEL
# ====================================================
class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default="INR")
    status = db.Column(db.String(50), default="pending")
    transaction_id = db.Column(db.String(100), unique=True)
    gateway_response = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="payments")

    def __repr__(self):
        return f"<Payment {self.id}>"


# ====================================================
# APPLICATION STATUS MODEL
# ====================================================
class ApplicationStatus(db.Model):
    __tablename__ = "application_statuses"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    college_id = db.Column(db.Integer, db.ForeignKey("colleges.id"))
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))

    status = db.Column(db.String(50), default="Pending")
    remarks = db.Column(db.String(255))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    user = db.relationship("User", back_populates="applications")
    college = db.relationship("College", back_populates="applications")
    course = db.relationship("Course", back_populates="applications")

    def __repr__(self):
        return f"<ApplicationStatus {self.status}>"

