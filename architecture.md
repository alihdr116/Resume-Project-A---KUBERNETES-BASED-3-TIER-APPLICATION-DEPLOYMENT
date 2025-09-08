# Project A — Architecture (Kubernetes 3-tier) 
[Overview file; explains the high-level architecture for you and interviewers]

## Diagram
Browser → Ingress (NGINX + TLS) → Frontend (frontend-svc) → Backend (backend-svc) → MySQL
[Simple linear diagram showing how requests flow from user to DB]

## Components
- Ingress (NGINX): terminates TLS, routes "/" → frontend and "/api" → backend. [Ingress acts as single entrypoint]
- Frontend: React static build served by nginx inside container (Deployment: 2 replicas). [Explains why nginx is used]
- Backend: Node.js + Express (Deployment: 2-3 replicas, HPA in prod). [Stateless API servers]
- Database: MySQL (single Pod for dev, RDS for prod). [Distinguish dev vs prod]
- Observability: Prometheus (metrics), Grafana (dashboards), Fluent Bit (logs). [Monitoring stack]
- CI/CD: GitHub Actions build → push images → kubectl apply / helm upgrade. [Deployment flow]
