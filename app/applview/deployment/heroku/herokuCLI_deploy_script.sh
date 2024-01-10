#!/bin/bash

#make sure you are logged in to heroku and heroku container registry before rnning this script.

APP_NAME="recruitmentpark-applview"
AUTH_IMAGE_NAME="hero-applview"

cd ../..


docker build -t $AUTH_IMAGE_NAME -f deployment/heroku/Dockerfile .

docker tag $AUTH_IMAGE_NAME registry.heroku.com/$APP_NAME/web

docker push registry.heroku.com/$APP_NAME/web

heroku container:release web -a $APP_NAME