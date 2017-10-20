#  docker build -t node-socialscreen .
#  docker run -p 3000:3000 node-socialscreen
FROM node:8-alpine
MAINTAINER ilari.liukko@iki.fi

ADD . /app
WORKDIR /app/
RUN npm install
EXPOSE 3000
CMD npm start
