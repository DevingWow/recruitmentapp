FROM nginx:alpine

COPY nginx.conf.template nginx.conf.template
COPY setport.sh setport.sh

RUN apk add --no-cache bash
RUN chmod +x setport.sh 

CMD [ "./setport.sh" ]


