# gunicorn.conf.py
timeout = 300        # 5 minutes — gives time for image upload + AI generation
workers = 1          # single worker is fine for this use case
worker_class = "sync"
keepalive = 5
max_requests = 100
