#Authorize google cloud repository to store build artifacts
gcloud auth configure-docker us-central1-docker.pkg.dev  

#Push articact
gcloud builds submit

#Push artifact from cli
gcloud builds submit --impersonate-service-account="ardent-service-account@ardent-427704.iam.gserviceaccount.com" --tag us-central1-docker.pkg.dev/ardent-427704/ardent-webapp-repository

#Push docker artifact
gcloud builds submit --tag us-central1-docker.pkg.dev/ardent-427704/ardent-webapp-repository