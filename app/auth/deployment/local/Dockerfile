#RUN IMAGE FROM AUTH DIRECTORY
FROM node:20

WORKDIR /usr/src/auth

COPY package*.json ./

RUN npm install

COPY . .

RUN mv deployment/local/docker_env_setup.sh docker_env_setup.sh
RUN chmod +x docker_env_setup.sh
RUN ./docker_env_setup.sh

EXPOSE 8000

CMD [ "npm", "start"]
