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
    user_id = request.args.get('user_id')
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        if user_id:
            cursor.execute("SELECT * FROM use_cases WHERE user_id = %s", (user_id,))
        else:
            cursor.execute("SELECT * FROM use_cases")
        result = cursor.fetchall()
        return jsonify(result), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/usecases/<int:id>', methods=['GET'])
def get_usecase_by_id(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM use_cases WHERE use_case_id = %s", (id,))
        result = cursor.fetchone()
        if result:
            return jsonify(result), 200
        return jsonify({"message": "Not found"}), 404
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

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

@app.route('/usecases/<int:id>', methods=['DELETE'])
def delete_usecase(id):
    user_id = request.args.get("user_id")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM use_cases WHERE id = %s AND user_id = %s", (id, user_id))
        conn.commit()
        return jsonify({"message": "Deleted"}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/usecases/<int:id>', methods=['PUT'])
def update_usecase(id):
    data = request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE use_cases SET
                title=%s, description=%s, business_owner=%s, ai_model_name=%s,
                use_case_category=%s, business_area=%s, risk_category=%s,
                lifecycle_stage=%s, kpis_impacted=%s, expected_benefits=%s,
                model_details=%s
            WHERE id=%s AND user_id=%s
        """, (
            data['title'], data['description'], data['business_owner'], data['ai_model_name'],
            data['use_case_category'], data['business_area'], data['risk_category'],
            data['lifecycle_stage'], data['kpis_impacted'], data['expected_benefits'],
            data['model_details'], id, data['user_id']
        ))
        conn.commit()
        return jsonify({"message": "Updated"}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)