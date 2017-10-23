#  docker build -t node-socialscreen .
#  docker run -p 3000:3000 -p3001:3001 node-socialscreen
FROM node:8-alpine
MAINTAINER ilari.liukko@iki.fi

ADD . /app
WORKDIR /app/
RUN npm install
EXPOSE 3000
EXPOSE 3001
CMD npm run all
