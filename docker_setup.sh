#!/bin/bash 

#Run this program from repo root directory.

RABBITMQ_HOSTNAME='rabbitMQ'
RABBITMQ_NAME='some-rabbit'
RABBITMQ_CONTAINER_PORT='5672' 
RABBITMQ_HOST_PORT='8651'

NETWORK_NAME='micro-network'

#starting rabbitMQ container
docker rm -f $RABBITMQ_NAME
docker run -d --hostname $RABBITMQ_HOSTNAME --name $RABBITMQ_NAME --network $NETWORK_NAME -p $RABBITMQ_HOST_PORT:$RABBITMQ_CONTAINER_PORT rabbitmq:3-management

echo "sleeping 10 seconds"
sleep 10

NGINX_DOCKER_PATH='app/gateway/local/'
MICROAUTH_DOCKER_PATH='deployment/local/Dockerfile'
APPLVIEW_DOCKER_PATH='app/applview/'
APPLCREATE_DOCKER_PATH='app/applcreate/'

NGINX_TAG='nginx-server'
MICROAUTH_TAG='auth-micro'
APPLVIEW_TAG='applview-micro'
APPLCREATE_TAG='applcreate-micro'

NGINX_CONTAINER_NAME='nginx_server'
MICROAUTH_CONTAINER_NAME='auth_micro'
APPLVIEW_CONTAINER_NAME='applview_micro'
APPLCREATE_CONTAINER_NAME='applcreate_micro'

MICRO_AUTH_CONTEXT='app/auth/'

GATEWAY_CONTAINER_PORT='80'
HOST_MAPPING_PORT='8000'

docker rm -f $NGINX_CONTAINER_NAME
docker rm -f $MICROAUTH_CONTAINER_NAME
docker rm -f $APPLVIEW_CONTAINER_NAME
docker rm -f $APPLCREATE_CONTAINER_NAME

docker build -t $NGINX_TAG $NGINX_DOCKER_PATH
docker build -t $MICROAUTH_TAG -f $MICROAUTH_DOCKER_PATH $MICRO_AUTH_CONTEXT
docker build -t $APPLVIEW_TAG $APPLVIEW_DOCKER_PATH
docker build -t $APPLCREATE_TAG $APPLCREATE_DOCKER_PATH

docker run -d --name $MICROAUTH_CONTAINER_NAME --net $NETWORK_NAME $MICROAUTH_TAG
docker run -d --name $APPLVIEW_CONTAINER_NAME --net $NETWORK_NAME $APPLVIEW_TAG
docker run -d --name $APPLCREATE_CONTAINER_NAME --net $NETWORK_NAME $APPLCREATE_TAG
docker run -d --name $NGINX_CONTAINER_NAME --net $NETWORK_NAME -p $HOST_MAPPING_PORT:$GATEWAY_CONTAINER_PORT $NGINX_TAG

sleep 1 

docker ps
