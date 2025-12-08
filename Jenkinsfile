pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-registry-url'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig-credentials'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Backend...'
                // Add backend build steps here (e.g., pip install to verify)
                sh 'pip install -r backend/requirements.txt'
                
                echo 'Building Frontend...'
                // Add frontend build steps here
                sh 'cd frontend && npm install && npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Tests...'
                // Add test steps here
                // sh 'pytest'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        def backendImage = docker.build("${DOCKER_REGISTRY}/backend:${env.BUILD_NUMBER}", "./backend")
                        backendImage.push()
                        backendImage.push("latest")

                        def frontendImage = docker.build("${DOCKER_REGISTRY}/frontend:${env.BUILD_NUMBER}", "./frontend")
                        frontendImage.push()
                        frontendImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: KUBECONFIG_CREDENTIALS_ID, variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -f k8s/backend-deployment.yaml'
                    sh 'kubectl apply -f k8s/backend-service.yaml'
                    sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                    sh 'kubectl apply -f k8s/frontend-service.yaml'
                    
                    // Force rollout to pick up new image tags (if using latest, or update the yaml dynamically)
                    sh 'kubectl rollout restart deployment/backend-deployment'
                    sh 'kubectl rollout restart deployment/frontend-deployment'
                }
            }
        }
    }
}
