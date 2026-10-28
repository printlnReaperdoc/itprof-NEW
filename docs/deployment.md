# Production Deployment Guide

## 1. Prerequisites
- **Node.js**: v18 LTS or v20/v22 LTS
- **MongoDB**: MongoDB Atlas (v6.0+ with Replica Set for multi-document transactions) or self-hosted Replica Set.
- **Process Manager**: PM2 or Docker containerization.
- **Reverse Proxy**: NGINX or Cloudflare with SSL/TLS termination.

## 2. Environment Configuration
Create `/backend/.env` with production secrets:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/itprof-lms?retryWrites=true&w=majority
SESSION_SECRET=<64-char-hex-secret>
SESSION_STORE_SECRET=<64-char-hex-secret>
CLIENT_URL=https://lms.university.edu
```

## 3. Building the Production Assets
Build the Vite frontend:
```bash
cd frontend
npm install --frozen-lockfile
npm run build
```

## 4. Serving the Application with PM2
```bash
cd backend
npm install --production
npm run seed  # Idempotently provisions initial 24 chapters & 480 questions
pm2 start server.js --name "itprof-lms-api" -i max
pm2 save
pm2 startup
```

## 5. NGINX Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name lms.university.edu;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lms.university.edu;

    ssl_certificate /etc/letsencrypt/live/lms.university.edu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lms.university.edu/privkey.pem;

    # Serve compiled React frontend
    location / {
        root /var/www/itprof-lms/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API and Storage to Express backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /storage/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
    }
}
```

