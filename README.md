<p align="center">
  <img width="197" alt="DailyDelishFavicon" src="https://github.com/user-attachments/assets/bcbf0bc3-7c96-456e-83a9-ef9bfe8a482e" />
</p>

<p align="center">
  <img width="45%" style="margin: 10px; alt="Screenshot 2025-07-02 at 7 30 54 PM" src="https://github.com/user-attachments/assets/b05ab692-eab3-4826-b147-43fcd1392aa2" />
  <img width="45%" style="margin: 10px; alt="Screenshot 2025-07-02 at 7 30 54 PM" src="https://github.com/user-attachments/assets/cd2f4ca9-da32-42da-867a-1788ec29609f" /><br>
  <img width="45%" style="margin: 10px; alt="Screenshot 2025-07-02 at 7 30 54 PM" src="https://github.com/user-attachments/assets/32d7eab6-8fd3-4cdd-a65e-85b5f3d7fb84" />
  <img width="45%" style="margin: 10px; alt="Screenshot 2025-07-02 at 7 30 54 PM" src="https://github.com/user-attachments/assets/7226c8a5-05c5-454a-806e-979a95c3eae7" /><br>
  <img width="45%" style="margin: 10px; alt="Screenshot 2025-07-02 at 7 30 54 PM" src="https://github.com/user-attachments/assets/ab1d5632-2bb0-4849-8b9e-2ec4af11d5c8" />
  <img width="45%" style="margin: 10px; alt="Screenshot 2025-07-02 at 7 30 54 PM" src="https://github.com/user-attachments/assets/8c4cb068-1b72-4d21-ab4d-ce5c09cf9ae2" />
</p>

DailyDelish is a **subscription-based fruits and vegetables web app** built with Django and Django Rest Framework (DRF). The platform allows users to subscribe to fresh, high-quality produce and manage their deliveries seamlessly.
<br>

<p><strong>Architecture</strong></p>
<img width="1370" height="745" alt="diagram-export-9-16-2025-4_33_20-PM" src="https://github.com/user-attachments/assets/5f6733c9-5b53-4af8-b32a-5cf1cabf7b63" />


<p><strong>Checkout the demo on YouTube:</strong></p>

<a href="https://youtu.be/B5zzzwTuY30">
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_(2017).svg" 
       alt="Watch on YouTube" 
       width="60" 
       style="vertical-align: middle;">
</a>

## Features
- User authentication & subscription management
- Browse and select fresh fruits & vegetables
- Custom delivery schedules
- Payment integration (Razorpay)
- Order tracking & history
- RESTful API for mobile & frontend integrations

## Tech Stack
- **Backend**: Django, Django Rest Framework (DRF)
- **Database**: PostgreSQL
- **Frontend**: React, Next.js,
- **Authentication**: OAuth2, JWT
- **Payments**: Razorpay
- **Containerization**: Docker
- **Deployment**: AWS

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
