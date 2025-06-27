from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usecases.db'
db = SQLAlchemy(app)

class UseCase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    business_owner = db.Column(db.String(100))
    ai_model_name = db.Column(db.String(100))
    use_case_category = db.Column(db.String(50))
    business_area = db.Column(db.String(100))
    risk_category = db.Column(db.String(20))
    lifecycle_stage = db.Column(db.String(20))
    kpis_impacted = db.Column(db.Text)
    expected_benefits = db.Column(db.Text)
    model_details = db.Column(db.Text)

@app.route('/usecases', methods=['GET'])
def get_usecases():
    usecases = UseCase.query.all()
    return jsonify([
        {
            "id": u.id,
            "title": u.title,
            "description": u.description,
            "business_owner": u.business_owner,
            "ai_model_name": u.ai_model_name,
            "use_case_category": u.use_case_category,
            "business_area": u.business_area,
            "risk_category": u.risk_category,
            "lifecycle_stage": u.lifecycle_stage,
            "kpis_impacted": u.kpis_impacted,
            "expected_benefits": u.expected_benefits,
            "model_details": u.model_details,
        } for u in usecases
    ])

@app.route('/')
def home():
    return "Backend is working!"

# Add POST, PUT, DELETE routes here

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

