# Stage 1: Build
FROM python:3.9-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Run
FROM python:3.9-slim
WORKDIR /app
COPY --from=builder /app /app
COPY app.py .
COPY tests/ ./tests
CMD ["python", "app.py"]
