FROM python:3.8-alpine

WORKDIR /app

COPY . .
RUN apk add build-base && \
    pip install -r requirements.txt


EXPOSE 8080
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "wsgi:app"]
