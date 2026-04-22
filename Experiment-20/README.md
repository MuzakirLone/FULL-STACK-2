# Experiment-20: Implement CI/CD pipeline for application deployment

---

## 1. Objective

To successfully integrate a Continuous Deployment (CD) pipeline into the previously built full-stack application (Experiment-16). This involves containerizing the backend application using Docker and establishing a CI/CD pipeline utilizing GitHub Actions to automatically build and push the Docker image to Docker Hub upon code changes.

## 2. Implementation Steps

### A. Dockerizing the Backend

We created a `Dockerfile` for the Flask backend testing suite to containerize the application environments.
The backend uses a lightweight Python image, installs the necessary dependencies (`Flask`, `gunicorn`, `pytest`), and exposes port `5000`.

### B. Configure CI/CD Secrets (Docker Hub Authentication)

To allow GitHub Actions to securely push the built images to Docker Hub, we need to provide authentication credentials without exposing them in the code:
1. Created an Access Token in Docker Hub for secure authentication.
2. Added the following repository secrets in the GitHub repository (Settings > Secrets and variables > Actions):
   - `DOCKER_USERNAME`: Your Docker Hub username.
   - `DOCKER_PASSWORD`: Docker Password

### C. CI/CD Integration using GitHub Actions

We configured a GitHub Actions workflow `.github/workflows/ci.yml` that performs the following automated steps upon every push or pull request to the `main` branch:

1. **Continuous Integration (CI):** Sets up the environment, installs dependencies, and automatically runs the `pytest` suite for the backend and `vitest` for the frontend to ensure all tests pass.
2. **Continuous Deployment (CD):** Once the tests successfully pass, the `build-and-push-docker` job triggers. This job logs into Docker Hub using the secrets configured in step B, builds the Docker images for the application, and securely pushes them to your Docker Hub repository.

---

## 3. Screenshots

### Screenshot 1: Docker Image and Running Container in CLI

<img width="828" height="187" alt="image" src="https://github.com/user-attachments/assets/311e5fcf-7727-4d32-bd66-506314bf3835" />

### Screenshot 2: GitHub Secrets configuration

<img width="1088" height="276" alt="image" src="https://github.com/user-attachments/assets/05ece73c-f079-45d1-adff-15d46c19054a" />

### Screenshot 3: Complete GitHub Actions Workflow

<img width="1854" height="840" alt="image" src="https://github.com/user-attachments/assets/2bcd2eb8-2661-405e-a3d3-b58da073d34f" />

### Screenshot 4: Docker Hub Images Pushed Successfully

<img width="1881" height="547" alt="image" src="https://github.com/user-attachments/assets/5ff66ffc-a1cc-477f-bbed-6c9ba2a7a702" />

### Learning Outcomes
1. Learned how to containerize a full-stack application using Docker and connect multiple containers through Docker Compose.
2. Understood the CI/CD pipeline stages — automated testing, building Docker images, pushing to Docker Hub, and deploying via Compose.
3. Gained hands-on experience configuring GitHub Actions workflows including MySQL service containers for integration testing.
4. Learned to manage sensitive credentials securely using GitHub repository secrets.
5. Understood how Docker Compose simplifies multi-container orchestration compared to running containers manually.

---
