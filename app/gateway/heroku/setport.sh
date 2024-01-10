#!/bin/bash

sed -i 's/¤PORT_PLACEHOLDER¤/'"$PORT"'/g' nginx.conf.template
sed -i 's/¤AUTH_SERVICE_PLACEHOLDER¤/'"$AUTH_SERVICE_URI"'/g' nginx.conf.template
sed -i 's/¤APPLVIEW_SERVICE_PLACEHOLDER¤/'"$APPLVIEW_SERVICE_URI"'/g' nginx.conf.template

cp nginx.conf.template /etc/nginx/nginx.conf

nginx -g 'daemon off;'