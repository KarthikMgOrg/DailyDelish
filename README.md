# DailyDelish
https://dailydelish.s3.ap-south-1.amazonaws.com/products/images/DailyDelishFavicon.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQKIU4H2J252T5OW2%2F20250401%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250401T080257Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCmFwLXNvdXRoLTEiSDBGAiEA3yh3EcFetHCceoUgsVrWSlgfwEcpjn1GwC4c07pFSW8CIQDC1gKkRTLHPRkIx1KHR7WqEN2awdbUOHT1n%2BQmZPe4VyrxAgi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDAyMjA1NTUwMTQ1OSIMQbJAkllTB%2BXMo2FSKsUCzZC%2FTU4yVecEXaPi0%2FpHZ2hU61hh8yymxARprMlYZ4yyQl1v5m7JijuWX%2BCMd92aqo7a%2FeXB%2FpNX2DWxjkxIeJdC1aklFzxHlsh9w2Qiixc9x7f6Us8arA1zE8fW89hSNRgJgjZhdNT%2Bo68FCef6dhbe%2FLHJiR4ad1U5RyfTOXQH9oLIbBOQGt5k3y12kTITaoHz%2FhjGXPNt56k%2FKde8UxpCziYqgcxLU9B%2B7KV1rziaxS%2BJCEy2mhHJOPGzHduManaHBYYnYP3Nn3bnb%2FVDesdLoqZxUXUFMJNrndZZfc2k%2FoAGnF5VEKn088K%2FiUDc5ury46xR2R%2FQUmgMKMXXu%2FonSa9mEZiO8wZoNydopZwHVjEygEuiqGdfFDE524M7vXkkvfLrVufQFZz282sjAtARpnJCrbeWBHDantEHBe4C51AaqDCSt66%2FBjqyAo5NyxHPdqM00EnLUavBE5BSuyCQC4kzJvUQM9b45FbkIXYr7U9rKbUxU6RxxZSWqGIaIVHkKvYPxAaiS9hjKPC8WS5gf%2BNG7UOc%2BYV%2B9YvOzoA4Zw5%2BDC3AAoOvQqbknx7hGijGgTjbsaJBWPKS75S0%2Bub2IEFlYo0AJuL6b56IO7NOaQACfbH5mVe6JSuISUNq0xYT%2FG%2F%2FCPSlhNIHR3hVbL7h6Je6jazk1%2F%2Bmv%2F5SS0dvfyKjzKcwLGGdZTxtmMya7Q6OuI4BZvUmvmzn1QadUFwSc9jZwwhlaltEkXwaI4R0maQ%2BrFeqcBo5lZPmkBI3VsS8k6uXFS0MOt1kdSFDh0DWQLk0BJQ2tpoHCh%2BgvADW0m%2BGQS%2BcywUgQsDLBBtplBqAapqnU0rWsQvo1n6%2BGw%3D%3D&X-Amz-Signature=4bd610d2f9e53672f9903fe14b19214b25a78e5acc7b7a416ea24b18616d385d&X-Amz-SignedHeaders=host&response-content-disposition=inline


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
