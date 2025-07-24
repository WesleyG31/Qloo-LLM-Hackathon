FROM python:3.10-slim

RUN pip install --upgrade pip
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

COPY --chown=user . .

RUN pip install --no-cache-dir -e .


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860", "--reload", "--log-level", "debug"]
