
FROM node:20

WORKDIR /usr/src/applview

COPY package*.json ./

RUN npm install

COPY . .

RUN mv deployment/local/docker_env_setup.sh docker_env_setup.sh
RUN chmod +x docker_env_setup.sh
RUN ./docker_env_setup.sh

EXPOSE 8040

CMD [ "npm", "start"]