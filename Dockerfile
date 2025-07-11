FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y libssl-dev libffi-dev gcc python3-dev

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

ENV GUNICORN_CMD_ARGS="--workers=2 --threads=4 --worker-class=gthread --bind=0.0.0.0:8000 --max-requests=1000 --max-requests-jitter=50 --timeout=30 --keep-alive=2 --log-level=info --access-logfile=-"
CMD ["gunicorn", "core.wsgi:application"]