from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validate, ValidationError
from sqlalchemy.exc import IntegrityError
import os

app = Flask(__name__)

# ===============================
# DATABASE CONFIGURATION
# ===============================
def configure_database():
    """Configure database URL for different environments"""
    database_url = os.getenv("DATABASE_URL", "")
    
    # Handle PostgreSQL URL format compatibility
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    
    # Use SQLite for local development if no DATABASE_URL is set
    return database_url if database_url else "sqlite:///students.db"

app.config['SQLALCHEMY_DATABASE_URI'] = configure_database()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ===============================
# DATABASE MODEL
# ===============================
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(20), unique=True, nullable=False, index=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Student {self.uid}: {self.name}>'

    def serialize(self):
        """Convert student object to dictionary"""
        return {
            "id": self.id,
            "uid": self.uid,
            "name": self.name,
            "age": self.age
        }

# ===============================
# VALIDATION SCHEMA
# ===============================
class StudentSchema(Schema):
    name = fields.Str(
        required=True, 
        validate=validate.Length(min=2, max=100),
        error_messages={"required": "Student name is required"}
    )
    age = fields.Int(
        required=True, 
        validate=validate.Range(min=1, max=120),
        error_messages={"required": "Student age is required"}
    )
    uid = fields.Str(
        required=True, 
        validate=validate.Length(min=3, max=20),
        error_messages={"required": "Student UID is required"}
    )

student_schema = StudentSchema()
student_partial_schema = StudentSchema(partial=True)

# ===============================
# ERROR HANDLERS
# ===============================
@app.errorhandler(ValidationError)
def handle_validation_error(e):
    return jsonify({
        "status": "error",
        "errors": e.messages
    }), 400

@app.errorhandler(404)
def not_found(e):
    return jsonify({"status": "error", "message": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"status": "error", "message": "Internal Server Error"}), 500

# ===============================
# ROUTES
# ===============================
@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "Student Management API is running 🚀",
        "version": "1.0"
    })

@app.route('/health')
def health_check():
    """Health check endpoint for monitoring services"""
    return jsonify({"status": "healthy", "service": "student-api"}), 200

# ===============================
# CREATE STUDENT
# ===============================
@app.route('/students', methods=['POST'])
def create_student():
    """Create a new student record"""
    try:
        request_data = request.get_json()
        
        if not request_data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400
        
        validated_data = student_schema.load(request_data)
        
        new_student = Student(**validated_data)
        db.session.add(new_student)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Student created successfully",
            "data": new_student.serialize()
        }), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": "Student with this UID already exists"
        }), 400

# ===============================
# GET ALL STUDENTS (with pagination)
# ===============================
@app.route('/students', methods=['GET'])
def get_all_students():
    """Retrieve all students with pagination support"""
    page_number = request.args.get('page', 1, type=int)
    page_limit = request.args.get('limit', 5, type=int)
    
    # Ensure positive values
    page_number = max(1, page_number)
    page_limit = max(1, min(page_limit, 100))  # Cap at 100

    paginated_students = Student.query.paginate(
        page=page_number, 
        per_page=page_limit, 
        error_out=False
    )

    return jsonify({
        "status": "success",
        "pagination": {
            "total": paginated_students.total,
            "page": page_number,
            "limit": page_limit,
            "pages": paginated_students.pages
        },
        "data": [student.serialize() for student in paginated_students.items]
    })

# ===============================
# GET SINGLE STUDENT
# ===============================
@app.route('/students/<int:student_id>', methods=['GET'])
def get_single_student(student_id):
    """Retrieve a specific student by ID"""
    student = Student.query.get_or_404(student_id)
    return jsonify({
        "status": "success",
        "data": student.serialize()
    })

# ===============================
# UPDATE STUDENT
# ===============================
@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update an existing student record"""
    try:
        student = Student.query.get_or_404(student_id)
        request_data = request.get_json()
        
        if not request_data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400

        validated_data = student_partial_schema.load(request_data)

        # Update student attributes
        for attribute, value in validated_data.items():
            setattr(student, attribute, value)

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Student updated successfully",
            "data": student.serialize()
        })

    except IntegrityError:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": "Student with this UID already exists"
        }), 400

# ===============================
# DELETE STUDENT
# ===============================
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student record"""
    student = Student.query.get_or_404(student_id)
    
    student_info = student.serialize()
    
    db.session.delete(student)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": f"Student {student_info['name']} deleted successfully"
    })

# ===============================
# DATABASE INITIALIZATION
# ===============================
def initialize_database():
    """Initialize database tables"""
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")

initialize_database()

# ===============================
# APPLICATION ENTRY POINT
# ===============================
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)