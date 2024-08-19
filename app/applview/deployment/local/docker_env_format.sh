#!/bin/bash

# below is the format for the docker env setup file for the application view for local deployment
# you can change below values as per your requirement
# after adding values change filename to docker_env_setup.sh

touch .env

PRIVATE_IP=# Add the private IP of the machine running the database
DATA_BASE_NAME=# Add the name of the database
DB_USER_NAME=# Add the username of the database
DB_PASSWORD=# Add the password of the database
JWT_SECRET=# Add the secret for the JWT
RABBITMQ_URL=# Add the URL for the RabbitMQ server
MAX_POOL=# Add the maximum number of connections to the database


echo 'DB_HOST='"$PRIVATE_IP" >> .env
echo 'DATABASE='"$DATA_BASE_NAME" >> .env
echo 'DB_USERNAME='"$DB_USER_NAME" >> .env
echo 'DB_PASSWORD='$DB_PASSWORD >> .env
echo 'RABBITMQ_URL='"$RABBITMQ_URL" >> .env
echo 'JWT_SECRET='"$JWT_SECRET" >> .env
echo 'MAX_POOL='"$MAX_POOL" >> .env
