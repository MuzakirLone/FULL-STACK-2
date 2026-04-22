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
   - `DOCKER_PASSWORD`: The Docker Hub Access Token generated in step 1.

### C. CI/CD Integration using GitHub Actions

We configured a GitHub Actions workflow `.github/workflows/ci.yml` that performs the following automated steps upon every push or pull request to the `main` branch:

1. **Continuous Integration (CI):** Sets up the environment, installs dependencies, and automatically runs the `pytest` suite for the backend and `vitest` for the frontend to ensure all tests pass.
2. **Continuous Deployment (CD):** Once the tests successfully pass, the `build-and-push-docker` job triggers. This job logs into Docker Hub using the secrets configured in step B, builds the Docker images for the application, and securely pushes them to your Docker Hub repository.

---

## 3. Screenshots

### Screenshot 1: Docker Image and Running Container in CLI

*(Add your screenshot here showing the terminal output of the docker build and docker run commands)*
![Docker Container CLI](Screenshots/docker_cli.png)

### Screenshot 2: GitHub Actions Workflow

*(Add your screenshot here showing the successful execution of the CI/CD pipeline on the GitHub repository Actions tab)*
![GitHub Actions Pipeline](Screenshots/github_actions.png)

### Screenshot 3: GitHub Secrets configuration

*(Add your screenshot here showing the DOCKER_USERNAME and DOCKER_PASSWORD configured in your repository secrets)*
![GitHub Secrets](Screenshots/github_secrets.png)

---
