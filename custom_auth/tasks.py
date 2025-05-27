from celery import shared_task
from django.core.mail import send_mail


from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


@shared_task
def send_welcome_email(email):
    print('SENDING EMAIL')

    subject = '🎉 Welcome to DailyDelish!'
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = [email]

    text_content = (
        'Thank you for signing up at DailyDelish! We’re thrilled to have you on board.\n'
        'Happy shopping!'
    )

    html_content = """
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #fff8e1; padding: 20px; color: #4e342e;">
        <h2 style="color: #ff7043;">🎉 Welcome to <span style="color:#43a047;">DailyDelish</span>!</h2>
        <p style="font-size: 16px;">
            Thank you for signing up! We're absolutely thrilled to have you on board.
        </p>
        <p style="font-size: 16px;">
            Get ready to explore a world of delicious deals and fresh picks. Happy shopping! 🛒💚
        </p>
        <img src="https://images.unsplash.com/photo-1600577916048-804c9191e36c?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="DailyDelish Banner" width="100%" style="border-radius: 10px; margin-top: 15px;">
        <p style="font-size: 14px; margin-top: 20px;">
            With love,<br><strong>The DailyDelish Team</strong>
        </p>
    </body>
    </html>
    """

    msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    print('MAIL SENT')
