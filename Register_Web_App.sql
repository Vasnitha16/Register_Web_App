CREATE DATABASE Register_Web_App;
USE Register_Web_App;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

SELECT * FROM users;

CREATE TABLE use_cases (
    use_case_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    business_owner VARCHAR(255) NOT NULL,
    ai_model_name VARCHAR(255) NOT NULL,
    use_case_category VARCHAR(255) NOT NULL,
    business_area VARCHAR(255) NOT NULL,
    risk_category VARCHAR(50) NOT NULL,
    lifecycle_stage ENUM('Idea', 'Development', 'Testing', 'Production', 'Retired') NOT NULL,
    kpis_impacted TEXT,
    expected_benefits TEXT,
    model_details LONGTEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO use_cases (
    title,
    description,
    business_owner,
    ai_model_name,
    use_case_category,
    business_area,
    risk_category,
    lifecycle_stage,
    kpis_impacted,
    expected_benefits,
    model_details,
    user_id
) VALUES (
    'Customer Churn Prediction',
    'Predict which customers are likely to leave using historical usage data.',
    'Jane Doe',
    'XGBoost Classifier',
    'Predictive Analytics',
    'Customer Service',
    'Medium',
    'Production',
    'Customer Retention Rate, Revenue',
    'Improved customer retention and reduced churn rate.',
    '<p>This model uses XGBoost with feature importance analysis. Training data includes customer demographics and transaction history.</p>',
    1
);

INSERT INTO use_cases (
    title, description, business_owner, ai_model_name,
    use_case_category, business_area, risk_category,
    lifecycle_stage, kpis_impacted, expected_benefits,
    model_details, user_id
) VALUES (
    'Demand Forecasting',
    'Forecast future product demand using time series data.',
    'Michael Johnson',
    'ARIMA',
    'Forecasting',
    'Supply Chain',
    'Low',
    'Testing',
    'Inventory Turnover, Stock-Out Rate',
    'Reduce overstock and stockouts by accurate forecasting.',
    '<p>Uses ARIMA time series analysis on historical sales data to predict demand.</p>',
    1
);

INSERT INTO use_cases (
    title, description, business_owner, ai_model_name,
    use_case_category, business_area, risk_category,
    lifecycle_stage, kpis_impacted, expected_benefits,
    model_details, user_id
) VALUES (
    'Fraud Detection in Transactions',
    'Detect fraudulent banking transactions using anomaly detection.',
    'Emily Brown',
    'Isolation Forest',
    'Anomaly Detection',
    'Finance',
    'High',
    'Production',
    'Fraud Rate, False Positives',
    'Prevent financial losses and secure transaction systems.',
    '<p>This system uses Isolation Forest to detect outliers in transaction data.</p>',
    2
);

INSERT INTO use_cases (
    title, description, business_owner, ai_model_name,
    use_case_category, business_area, risk_category,
    lifecycle_stage, kpis_impacted, expected_benefits,
    model_details, user_id
) VALUES (
    'Customer Support Chatbot',
    'Automate customer queries using a chatbot trained on historical support data.',
    'Olivia Taylor',
    'GPT-4',
    'Natural Language Processing',
    'Customer Support',
    'Medium',
    'Development',
    'Resolution Time, Support Costs',
    'Reduces support cost and response time.',
    '<p>Built with GPT-4 using fine-tuned Q&A data for the company knowledge base.</p>',
    2
);

INSERT INTO use_cases (
    title, description, business_owner, ai_model_name,
    use_case_category, business_area, risk_category,
    lifecycle_stage, kpis_impacted, expected_benefits,
    model_details, user_id
) VALUES (
    'Image Defect Detection',
    'Detect product defects from manufacturing images using deep learning.',
    'Liam Patel',
    'ResNet-50',
    'Computer Vision',
    'Quality Assurance',
    'High',
    'Testing',
    'Defect Rate, Inspection Time',
    'Automates visual inspection, reducing human error.',
    '<p>Uses a pretrained ResNet-50 model fine-tuned on labeled defect images.</p>',
    2
);
select * from use_cases;

CREATE TABLE model_accuracy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    use_case_id INT,
    date DATE,
    accuracy FLOAT,
    FOREIGN KEY (use_case_id) REFERENCES use_cases(use_case_id)
);
SELECT * FROM model_accuracy WHERE use_case_id = 3;
