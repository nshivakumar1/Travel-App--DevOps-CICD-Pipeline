pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root:root' // allows npm to install globally if needed
        }
    }
    
    environment {
        DOCKER_IMAGE = 'travel-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        SONAR_TOKEN = credentials('sonar-token')
        TRIVY_SEVERITY = 'CRITICAL,HIGH'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'junit.xml'
                }
            }
        }
        
        stage('Code Quality') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=travel-app \
                        -Dsonar.sources=src \
                        -Dsonar.tests=src \
                        -Dsonar.test.inclusions=src/**/*.test.ts,src/**/*.test.tsx \
                        -Dsonar.exclusions=node_modules/**,dist/**,coverage/** \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.testExecutionReportPaths=test-report.xml
                    '''
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh '''
                    trivy image --severity ${TRIVY_SEVERITY} --format template --template "@contrib/html.tpl" -o trivy-report.html ${DOCKER_IMAGE}:${DOCKER_TAG}
                    trivy fs --severity ${TRIVY_SEVERITY} .
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 