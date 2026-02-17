from flask import request
from datetime import datetime

def register_middlewares(app):
    """Register all middlewares for the Flask application"""
    
    @app.before_request
    def log_request():
        """Log incoming requests"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {request.method} {request.path}")
    
    @app.after_request
    def log_response(response):
        """Log outgoing responses"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] Response Status: {response.status_code}")
        return response
