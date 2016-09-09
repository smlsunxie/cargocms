node {

  try {
    // slackSend message: "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"

    def preview = false;
    def skiptest = false;

    try{
      timeout(time:10, unit:'SECONDS') {
          stage 'preview'
          input message: "wanner preview?", ok: "start preview"
      }
      preview = true;

      if(preview){
        timeout(time:5, unit:'SECONDS') {
            stage 'skip test'
            input message: "skip test?", ok: "skip test"
        }

        skiptest = true;
      }


    }catch(e){

    }

    stage 'checkout project'
    // git url: 'https://github.com/trunk-studio/cargocms.git', branch: 'develop'
    checkout scm

    stage 'check env'
    sh "node -v"

    // stage 'install pm2'
    // sh "npm install pm2 -g"

    stage 'build project'
    sh "npm install && npm run build"

    if(!skiptest){
      stage 'test project'
      sh "npm run test-ci"
      step([$class: 'JUnitResultArchiver', testResults: 'test-results.xml'])
      step([$class: 'CloverPublisher', cloverReportDir: 'coverage', cloverReportFileName: 'clover.xml'])
      sh "npm run test-e2e-docker"
    }

    if(preview) sh "npm run preview"

    // stage 'run project'
    // sh "npm run pm2-start"
    //
    // try{
    //   stage 'Approve, go production'
    //   def url = 'http://localhost:1337/'
    //   input message: "Does staging at $url look good? ", ok: "Deploy to production"
    // }finally{
    //   sh "npm run pm2-stop"
    // }
    //
    // stage 'package production'
    // sh "make package-production"
    // step([$class: 'ArtifactArchiver', artifacts: 'sailsSampleProd.tar.gz', fingerprint: true])
    //
    // stage 'deploy production'
    // sh "make deploy-production-legacy"
    //
    // stage 'restart production'
    // sh "make restart-production"

    slackSend color: 'good', message: "success ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
  }catch(e){
    slackSend color: 'danger', message: "fail ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    throw e;
  }

}
