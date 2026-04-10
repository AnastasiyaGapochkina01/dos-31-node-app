def remote = [:]

pipeline {
    agent any
    parameters {
        gitParameter(type: 'PT_BRANCH', name: 'REVISON', branchFilter: 'origin/(.*)', defaultValue: 'main')
        choice(name: 'USER', choices: ['iivanov', 'ppetrov', 'ssmirnof'], description: 'project owner')
    }

    environment {
        PRJ = "node-app"
        DIR = "/home/${params.USER}/www/$PRJ"
        HOST = "44.221.46.188"
        GIT_URL = "git@github.com:AnastasiyaGapochkina01/dos-31-node-app.git"
    }

    stages {
        stage('Prepare Credentials') {
            steps {
                 withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-key', usernameVariable: 'username', keyFileVariable: 'private_key')]) {
                    script {
                        remote.name = "${env.HOST}"
                        remote.host = "${env.HOST}"
                        remote.user = "${username}"
                        remote.identity = readFile "${private_key}"
                        remote.allowAnyHosts = true
                    }
                }
            }
        }
        stage('Checkout branch') {
            steps {
                git branch: "${params.REVISON}", credentialsId: 'jenkins-key', url: "${env.GIT_URL}"
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'chown -R 111:113 "/.npm" || true'
                sh 'npm cache clean --force || true'
                sh 'npm install'
                sh 'npm ci'
                sh 'npm run build'
                sh 'tar -czvf frontend.tar.gz dist/'
                archiveArtifacts artifacts: 'frontend.tar.gz', fingerprint: true, onlyIfSuccessful: true
            }
        }

        stage('Release') {
            steps {
               script {
                sshCommand remote: remote, command: """
                    set -ex
                    rsync -av --delete -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i remote.identity" dist/ "${env.HOST}:${env.DIR}"
                    
                """
               }
            }
        }
    }
}
