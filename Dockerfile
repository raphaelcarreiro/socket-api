FROM node:22

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3002

CMD ["tail", "-f", "/dev/null"]
