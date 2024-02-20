#!/bin/bash

sed -i 's/¤AUTH_SERVICE_PLACEHOLDER¤/'"$AUTH_SERVICE_URI"'/g'  nginx.conf

cp nginx.conf /etc/nginx/nginx.conf

nginx -g 'daemon off;'