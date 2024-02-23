#!/bin/bash

sed -i 's/¤AUTH_SERVICE_PLACEHOLDER¤/'"$AUTH_SERVICE_URI"'/g'  nginx.conf
sed -i 's/¤APPLCREATE_SERVICE_PLACEHOLDER¤/'"$APPLCREATE_SERVICE_URI"'/g' nginx.conf
sed -i 's/¤APPLVIEW_SERVICE_PLACEHOLDER¤/'"$APPLVIEW_SERVICE_URI"'/g' nginx.conf

cp nginx.conf /etc/nginx/nginx.conf

touch /var/log/access.txt
touch /var/log/error.txt

chmod 666 /var/log/access.txt
chmod 666 /var/log/error.txt

nginx -g 'daemon off;'