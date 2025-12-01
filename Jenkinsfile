pipeline {
    agent any

    stages {
        stage('Checkout code') {
            steps {
                echo 'Checking out the code from the github repo'
                checkout scm
            }
        }

        stage('Test the Backend') {
            steps {
                echo 'Testing the backend'
                dir('server') {
                    sh 'npm install'
                    // sh 'npm test'
                }
            }
        }

        stage('Test the frontend') {
            steps {
                echo 'Testing the frontend'
                dir('client') {
                    sh 'npm install'
                    // sh 'npm test'
                }
            }
        }

        stage('Build the frontend') {
            steps {
                echo 'Building the frontend into a dist folder'
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy with SFTP') {
            steps {
                echo 'Deploying frontend to Hostinger...'
                withCredentials([usernamePassword(
                    credentialsId: 'hostinger-sftp',
                    usernameVariable: 'SFTP_USER',
                    passwordVariable: 'SFTP_PASS'
                )]) {
                    sh '''
                        lftp -e "
                            set sftp:auto-confirm yes;
                            open -u u218069050,25717204Ak_ -p 65002 sftp://amribrahim.tech;
                            mirror -R --verbose client/dist public_html/tshirtcustomizer;
                            bye
                        "
                    '''
                }
                echo 'Deployment complete!'
            }
        }
    }
}
