# AI Workflow Orchestrator (Multi-Agent LLM System)

A **multi-agent orchestration platform** built using **CrewAI** and **LangChain**, where role-specific AI agents collaborate to perform complex workflows. Agents such as **Researcher, Planner, and Writer** work together via GPT models to deliver automated, end-to-end AI-driven solutions.

---

## 🚀 Features

* **Multi-Agent Collaboration**: Role-specific agents (Researcher, Planner, Writer) that communicate and collaborate.
* **Web-Connected Tools**: Agents can query external data sources (search/APIs) for real-time knowledge.
* **Backend Infrastructure**: Powered by **AWS ECS** for scalability and high availability.
* **Storage**: **Amazon RDS** for structured storage and **S3** for object storage.
* **Frontend Dashboard**: Built with **React**, served via **CloudFront** for global distribution.
* **LangChain + CrewAI**: Provides workflow orchestration, memory, and reasoning capabilities.

---

## 📂 Project Structure

```bash
ai-workflow-orchestrator/
│
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── orchestrator/    # CrewAI orchestration logic
│   │   ├── routes/          # FastAPI routes (APIs)
│   │   ├── utils/           # Utility functions
│   │   ├── db.py            # Database configuration
│   │   └── main.py          # FastAPI entrypoint
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                # React dashboard (served via S3 + CloudFront)
├── docker-compose.yml       # Local orchestration
├── README.md
└── .gitignore
```

---

## ⚙️ Tech Stack

* **LLM Orchestration**: LangChain, CrewAI
* **Backend**: FastAPI (Dockerized, deployed on AWS ECS)
* **Frontend**: React + Material UI (served via S3/CloudFront)
* **Database**: Amazon RDS (PostgreSQL)
* **Storage**: Amazon S3
* **Infra & Deployment**: AWS ECS, CloudFront, Docker

---

## 📊 Example Workflow

1. **Researcher Agent** gathers latest data from web/API.
2. **Planner Agent** structures the workflow and outlines tasks.
3. **Writer Agent** generates polished output (reports, summaries, drafts).
4. Results are displayed in the **React dashboard**.

---

## 🛠️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/bitanish/ai-workflow-orchestrator.git
cd ai-workflow-orchestrator
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Local Orchestration (Docker Compose)

```bash
docker-compose up --build
```

---

## 🌐 Deployment

* **Backend** → Dockerized and deployed on **AWS ECS**
* **Frontend** → Built React app hosted on **S3** and distributed via **CloudFront**
* **Database** → Amazon RDS (Postgres)
* **Storage** → Amazon S3 for assets and workflow results

---

## 📌 Roadmap

* [ ] Add more role-specific agents (e.g., Critic, Validator)
* [ ] Introduce workflow visualization in dashboard
* [ ] Enable fine-tuning with domain-specific data
* [ ] Add observability (Prometheus + Grafana)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

MIT License – feel free to use and adapt for your own projects.
