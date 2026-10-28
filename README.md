# Production-Ready MERN Learning Management System (LMS)
### IT Professional Electives 2 & 4 • University 4th Year Curriculum (4-1)

A complete, production-ready, full-stack MERN Learning Management System combining **Data Mining (IT Professional Elective 2 - ITEP411-T)** and **Cloud Computing (IT Professional Elective 4 - ITEP413-T)** into a single unified web application.

---

## 1. Project Overview & Key Features

- **Unified Curriculum**: Serves both courses under one application while guaranteeing 100% independent enrollment, chapter progression, assessment records, and gradebooks.
- **Preloaded Ready-to-Teach Content**: All 24 chapters are preloaded with authentic, university-level lesson content and interactive presentation slide decks immediately after database seeding.
- **Preloaded Assessments**: Exactly 20 curriculum-aligned multiple-choice questions for each of the 24 chapters (**480 questions total**, 1920 options) persisted in MongoDB.
- **Sequential Chapter Unlocking**: Chapter 1 is available upon enrollment; Chapter $N+1$ unlocks strictly when Chapter $N$ achieves a verified passing score ($\ge 15/20$ or $75\%$). Passing in Data Mining never unlocks Cloud Computing.
- **Interactive Slide Presentation Viewer**: Embedded presentation viewer with previous/next controls, keyboard navigation (arrow keys, spacebar, 'f' for fullscreen, 'n' for notes, 'o' for overview), slide index drawer, presenter notes, and faculty editing.
- **Server-Enforced Timed Quizzes**: 10-minute server-authoritative timer, auto-timeout finalization, hidden answer keys, and dynamic answer saving.
- **Course-Wide Master Gradebooks**: Comprehensive 12-chapter matrix for each course displaying highest scores, attempted averages (unattempted excluded from average), chapters passed, completion percentages, and student filtering.
- **Multi-Format Export Engine**: Server-side report generation for Excel (`.xlsx`), CSV, PDF (PDFKit), and browser Print view with spreadsheet formula injection protection.
- **Centralized MongoDB Audit Logging**: Detailed audit records with request IDs, IP tracking, and automatic redaction of sensitive credentials.
- **Role-Based Authorization**: Distinct Student and Faculty experiences with protected endpoints and automated administrative privilege isolation.

---

## 2. Unified Course Structure

```text
IT Professional Electives
├── Course A: Data Mining (IT Professional Elective 2 - ITEP411-T)
│   ├── Module 1: Foundations and Preprocessing
│   │   ├── Chapter 1: Introduction to Data Mining
│   │   ├── Chapter 2: Data, Measurements, and Data Preprocessing
│   │   └── Chapter 3: Data Warehousing and Online Analytical Processing (OLAP)
│   ├── Module 2: Pattern Mining and Association
│   │   ├── Chapter 4: Pattern Mining: Basic Concepts and Methods
│   │   └── Chapter 5: Pattern Mining: Advanced Methods
│   ├── Module 3: Classification and Machine Learning
│   │   ├── Chapter 6: Classification: Basic Concepts and Methods
│   │   └── Chapter 7: Classification: Advanced Methods
│   └── Module 4: Clustering and Advanced Mining
│       ├── Chapter 8: Cluster Analysis: Basic Concepts and Methods
│       ├── Chapter 9: Cluster Analysis: Advanced Methods
│       ├── Chapter 10: Deep Learning
│       ├── Chapter 11: Outlier Detection
│       └── Chapter 12: Data Mining Trends and Research Frontiers
│
└── Course B: Cloud Computing (IT Professional Elective 4 - ITEP413-T)
    ├── Module 1: Basics and Architecture
    │   ├── Chapter 1: Introduction to Cloud Computing
    │   ├── Chapter 2: Cloud Architecture and Core Concepts
    │   ├── Chapter 3: Cloud Service Models (IaaS, PaaS, SaaS)
    │   └── Chapter 4: Cloud Deployment Models (Public, Private, Hybrid, Community)
    ├── Module 2: Core Technologies
    │   ├── Chapter 5: Virtualization Fundamentals
    │   ├── Chapter 6: Cloud Storage and Data Management
    │   └── Chapter 7: Cloud Networking
    ├── Module 3: Security, Operations, and Platforms
    │   ├── Chapter 8: Cloud Security and Privacy
    │   ├── Chapter 9: Containers and Serverless Computing
    │   ├── Chapter 10: Major Cloud Platforms (AWS, Azure, GCP)
    │   └── Chapter 11: Cloud Governance, Cost Management, and Ethics
    └── Module 4: Advanced Topics
        └── Chapter 12: Emerging Trends and Future of Cloud Computing
```

---

## 3. Technology Stack

- **Frontend**: React 19, Vite 8, React Router v7, Axios, Lucide React, Canvas Confetti.
- **Backend**: Node.js, Express.js 5, Mongoose 9, bcryptjs, express-session, connect-mongo.
- **Security**: Helmet, Express Rate Limit, Cookie-Parser, CSRF double-submit protection, UUID request tracing.
- **Reporting & Exports**: ExcelJS (XLSX, CSV), PDFKit (PDF), CSS Print Media.
- **Database**: MongoDB Atlas Replica Set (with multi-document transactions support).

---

## 4. Prerequisites

- **Node.js**: `v18.0.0` or higher (tested on Node v22).
- **npm**: `v9.0.0` or higher.
- **MongoDB**: MongoDB Atlas Cluster or local MongoDB v6+ replica set.

---

## 5. Installation & Setup

### 1. Clone & Install Dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd ../frontend
npm install
```

### 2. Configure Environment Variables

In `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/itprof-NEW
SESSION_SECRET=your_long_session_secret_key_2026
SESSION_STORE_SECRET=your_mongo_store_secret_2026
CLIENT_URL=http://localhost:5173
```

*(See `backend/.env.example` for reference).*

### 3. Database Seeding

Run the idempotent database seed script to populate all 2 courses, 8 modules, 24 chapters, 24 lessons, 24 presentations, and 480 quiz questions:
```bash
cd backend
npm run seed
```

---

## 6. Default Demo Credentials

| Role | Username | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Faculty** | `faculty` | `FacultyPassword2026!` | Manage lessons, slides, quizzes, master gradebooks, and audit logs. |
| **Student** | `student1` | `StudentPassword2026!` | Default demo student account. |

*(New student accounts can also be registered at `/register`).*

---

## 7. Starting the Application

### Development Mode

Start Backend (Port 5000):
```bash
cd backend
npm run dev
# or: npm start
```

Start Frontend (Port 5173 with automatic `/api` proxy):
```bash
cd frontend
npm run dev
```

Open your browser at: **`http://localhost:5173`**

---

## 8. Automated Testing

Run the integration and verification test suite:
```bash
cd backend
npm test
```

The test suite verifies:
1. Unified curriculum structure (2 courses, 8 modules, 24 chapters).
2. Content integrity (all 24 lessons and presentations published).
3. Assessment integrity (all 24 quizzes contain exactly 20 questions with 4 options and 1 correct answer).
4. Sequential unlocking (Chapter 1 unlocked by default; Chapter 2 locked).
5. Cross-course isolation (passing Data Mining Chapter 1 unlocks Data Mining Chapter 2, but NEVER Cloud Computing Chapter 2).
6. Failed attempts ($\le 14/20$) do NOT unlock subsequent chapters.
7. Audit log creation and credential redaction.

---

## 9. Faculty Account Provisioning CLI

To provision a new administrative faculty account from the command line:
```bash
cd backend
node database/provisionFaculty.js <username> <password> <firstName> <surname> [faculty|admin]
```
Example:
```bash
node database/provisionFaculty.js prof_garcia Pass12345! Maria Garcia faculty
```

---

## 10. Operational Documentation Links

- [Deployment Guide](docs/deployment.md)
- [Database Backup and Restoration](docs/database-backup.md)
- [Application Security Architecture](docs/security.md)

