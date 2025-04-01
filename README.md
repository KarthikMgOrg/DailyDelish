# DailyDelish
<img width="197" alt="DailyDelishFavicon" src="https://github.com/user-attachments/assets/bcbf0bc3-7c96-456e-83a9-ef9bfe8a482e" />



DailyDelish is a **subscription-based fruits and vegetables web app** built with Django and Django Rest Framework (DRF). The platform allows users to subscribe to fresh, high-quality produce and manage their deliveries seamlessly.

## Features
- User authentication & subscription management
- Browse and select fresh fruits & vegetables
- Custom delivery schedules
- Payment integration (Stripe/Razorpay/PayPal)
- Order tracking & history
- Admin dashboard for managing products & subscriptions
- RESTful API for mobile & frontend integrations

## Tech Stack
- **Backend**: Django, Django Rest Framework (DRF)
- **Database**: PostgreSQL / MySQL
- **Frontend**: (Optional) React, Vue.js, or any modern framework
- **Authentication**: OAuth2, JWT
- **Payments**: Stripe / Razorpay / PayPal
- **Deployment**: AWS, Heroku, or DigitalOcean

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/DailyDelish.git
cd DailyDelish
```

### 2. Create & Activate Virtual Environment
```sh
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3. Install Dependencies
```sh
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file and add the necessary configurations:
```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 5. Apply Migrations & Create Superuser
```sh
python manage.py migrate
python manage.py createsuperuser
```

### 6. Run the Development Server
```sh
python manage.py runserver
```

### 7. Access the Application
- API: `http://127.0.0.1:8000/api/`
- Admin Panel: `http://127.0.0.1:8000/admin/`

## API Documentation
The API documentation is available via **DRF Spectacular** at:
```
http://127.0.0.1:8000/api/schema/docs/
```

## Running Tests
```sh
python manage.py test
```

## Deployment
For production deployment, configure **Gunicorn**, **Nginx**, and **PostgreSQL**. Example:
```sh
pip install gunicorn
```
Run the application:
```sh
gunicorn --bind 0.0.0.0:8000 core.wsgi:application
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## License
This project is licensed under the MIT License.
