FROM node:lts

ENV AWS_XRAY_DAEMON_ADDRESS=10.100.222.158:2000

RUN mkdir -p /usr/src/app

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 8080  
RUN npm install  
CMD ["npm", "start"] 