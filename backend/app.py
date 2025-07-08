from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import hashlib

app = Flask(__name__)
CORS(app)

# Database config
db_config = {
    'host': 'localhost',
    'database': 'Register_Web_App',
    'user': 'root',
    'password': 'root'  # Use your actual password
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        if cursor.fetchone():
            return jsonify({"message": "Username already exists"}), 409

        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
        conn.commit()

        return jsonify({"message": "Registration successful"}), 201

    except Error as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, hashed_password))
        user = cursor.fetchone()

        if user:
            return jsonify({"message": "Login successful", "user": user}), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401

    except Error as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/usecases', methods=['GET'])
def get_all_usecases():
    id = request.args.get('id')
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        if id:
            cursor.execute("SELECT * FROM use_cases WHERE id = %s", (id,))
        else:
            cursor.execute("SELECT * FROM use_cases")
        result = cursor.fetchall()
        return jsonify(result), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


#creating a usecase
@app.route('/usecases', methods=['POST'])
def create_usecase():
    data = request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            INSERT INTO use_cases (
                title, description, business_owner, ai_model_name,
                use_case_category, business_area, risk_category,
                lifecycle_stage, kpis_impacted, expected_benefits,
                model_details, user_id
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            data['title'], data['description'], data['business_owner'], data['ai_model_name'],
            data['use_case_category'], data['business_area'], data['risk_category'],
            data['lifecycle_stage'], data['kpis_impacted'], data['expected_benefits'],
            data['model_details'], data['user_id']
        ))
        conn.commit()
        return jsonify({"message": "Use case created"}), 201
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

#delete a usecase
@app.route('/usecases/<int:use_case_id>', methods=['DELETE'])
def delete_use_case(use_case_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM use_cases WHERE use_case_id = %s", (use_case_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Use case deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/usecases/<int:use_case_id>', methods=['GET'])
def get_use_case(use_case_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM use_cases WHERE use_case_id = %s", (use_case_id,))
    use_case = cursor.fetchone()
    cursor.close()
    conn.close()
    if use_case:
        return jsonify(use_case)
    return jsonify({'error': 'Use case not found'}), 404

#update the usecase
@app.route('/usecases/<int:use_case_id>', methods=['PUT'])
def update_use_case(use_case_id):
    data = request.get_json()
    fields = ['title', 'description', 'business_owner', 'ai_model_name', 'use_case_category',
              'business_area', 'risk_category', 'lifecycle_stage', 'kpis_impacted',
              'expected_benefits', 'model_details']
    values = [data.get(field) for field in fields]

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"""
        UPDATE use_cases
        SET {', '.join(f"{field} = %s" for field in fields)}
        WHERE use_case_id = %s
    """, (*values, use_case_id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Use case updated'})

if __name__ == '__main__':
    app.run(debug=True)