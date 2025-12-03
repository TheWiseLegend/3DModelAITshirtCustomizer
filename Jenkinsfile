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
                    sh 'npm test'
                }
            }
        }

        stage('Test the frontend') {
            steps {
                echo 'Testing the frontend'
                dir('client') {
                    sh 'npm install'
                    sh 'npm test'
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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'hostinger-sftp',
                        usernameVariable: 'SFTP_USER',
                        passwordVariable: 'SFTP_PASS'),
                    string(credentialsId: 'SFTP_PORT', variable: 'SFTP_PORT'),
                    string(credentialsId: 'SFTP_HOST', variable: 'SFTP_HOST'),
                    string(credentialsId: 'HOSTINGER_BASE_PATH', variable: 'BASE_PATH')
                ])
                {
                    sh """
                        lftp -e "
                            set sftp:auto-confirm yes;
                            open -u \$SFTP_USER,\$SFTP_PASS -p \$SFTP_PORT sftp://\$SFTP_HOST;
                            mirror -R --verbose client/dist \$BASE_PATH/public_html/tshirtcustomizer;
                            bye
                        "
                    """
                }
                echo 'Deployment complete!'
            }
        }
    }
}
