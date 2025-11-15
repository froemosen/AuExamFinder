FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# Install Python dependencies
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the project
COPY . /app

EXPOSE 5002

# expose internal port 5002 for Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5002", "backend.app:app"]