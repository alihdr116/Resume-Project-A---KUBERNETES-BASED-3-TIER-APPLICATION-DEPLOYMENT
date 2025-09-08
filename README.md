# Project A — Kubernetes-Based 3-Tier Web App

[One-liner summary for repo visitors]

## Quick start (local - Docker Compose)
1. `docker compose up --build`    # [build and run frontend, backend, DB locally]
2. Open `http://localhost:3000`   # [React dev served via nginx mapping]

## Local K8s (Minikube)
1. `minikube start --driver=docker` # [start local K8s cluster]
2. `kubectl apply -f k8s/`         # [apply manifests in infra/k8s folder]

## Repo layout
- `frontend/`  — React app [client code]
- `backend/`   — Node/Express API [server code]
- `k8s/`       — Kubernetes manifests & helm charts
- `docker/`    — Docker build helpers / compose
