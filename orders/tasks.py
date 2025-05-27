from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


@shared_task
def order_placed_email(email):
    print(email, " is the email")

    subject = "🎉 We Got Your Order! 🎉"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = [email]

    # Fallback plain-text content
    text_content = (
        "Thank you for your order from DailyDelish!\n\n"
        "We’re cooking things up and will notify you once it’s on the way.\n"
        "Thanks for shopping with us!"
    )

    # Rich HTML content
    html_content = """
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #fef9f4; padding: 20px; color: #4e342e;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #ff7043; text-align: center;">🎉 Order Confirmed!</h2>
            <p style="font-size: 16px;">
                Hello there! 👋
            </p>
            <p style="font-size: 16px;">
                Thank you for your order with <strong>DailyDelish</strong>! We're preparing your items and will notify you once it's out for delivery.
            </p>
            <p style="font-size: 16px;">
                In the meantime, feel free to browse more <a href="https://dailydelish.shop" style="color: #43a047; text-decoration: none;">delicious picks</a> on our website.
            </p>
            <img src="https://images.unsplash.com/photo-1648394794449-5dbe63f6a8b5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Thank you" style="width: 100%; border-radius: 10px; margin-top: 15px;" />
            <p style="font-size: 14px; margin-top: 20px; text-align: center;">
                🍲 Bon appétit!<br>
                — The DailyDelish Team
            </p>
        </div>
    </body>
    </html>
    """

    msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    msg.attach_alternative(html_content, "text/html")

    try:
        msg.send(fail_silently=False)
        print("EMAIL SENT")
    except Exception as e:
        print("EMAIL ERROR:", str(e))
