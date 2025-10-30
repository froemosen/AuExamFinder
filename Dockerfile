FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# Install Python dependencies
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy the project
COPY . /app

EXPOSE 5000

# Run the Flask development server
ENV FLASK_APP=backend.app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
