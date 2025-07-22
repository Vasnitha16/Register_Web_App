import mysql.connector
from mysql.connector import Error
from datetime import datetime, timedelta
import random

# Database config
db_config = {
    'host': 'localhost',
    'database': 'Register_Web_App',
    'user': 'root',
    'password': 'root'
}

try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(buffered=True)  # ✅ Fix: buffered cursor

    num_days = 90
    use_case_ids = [2, 3, 4]
    start_date = datetime.today() - timedelta(days=num_days)
    

    for day in range(num_days):
        current_date = (start_date + timedelta(days=day)).date()

        for uc_id in use_case_ids:
            # Check if record exists for this use_case_id and date
            cursor.execute("""
                SELECT 1 FROM model_accuracy
                WHERE use_case_id = %s AND date = %s
            """, (uc_id, current_date))
            exists = cursor.fetchone()

            if not exists:
                accuracy = round(random.uniform(70, 99), 2)
                cursor.execute("""
                    INSERT INTO model_accuracy (use_case_id, date, accuracy)
                    VALUES (%s, %s, %s)
                """, (uc_id, current_date, accuracy))
                

    conn.commit()
    print(f" Inserted daily accuracy data ")

except Error as e:
    print(f"❌ Error: {e}")
finally:
    if cursor:
        cursor.close()
    if conn:
        conn.close()
