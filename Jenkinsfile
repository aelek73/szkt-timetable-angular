pipeline {
    agent jenkins-slave01
    stages {
        stage('Building') {
            steps {
                sh 'echo Commit id is $GIT_COMMIT &&\
                npm i &&\
                ng serve --proxy-config proxy.json'
            }
        }
    }
}
