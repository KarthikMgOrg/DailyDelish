from celery import shared_task
from django.core.mail import send_mail


@shared_task
def send_welcome_email(email):
    print('SENDING EMAIL')
    send_mail(
        'Welcome to DailyDelish!',
        'Thank you for signing up! Happy shopping',
        'care@dailydelish.shop',
        [email],
        fail_silently=False
    )
    print('MAIL SENT')