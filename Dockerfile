FROM node:15.3.0-alpine3.10

RUN npm install -g @angular/cli@8.1.0

RUN apk add --no-cache git

USER node

RUN cd /home/node && \
  git clone https://github.com/akoselek273/szkt-timetable-webapp &&\
  git clone https://github.com/akoselek273/szkt-timetable-backend

RUN cd /home/node/szkt-timetable-webapp &&\
  npm i &&\
  cd ../szkt-timetable-backend &&\
  npm install

EXPOSE 4200 3000
ENTRYPOINT [ "/bin/sh", "-C", "/home/node/szkt-timetable-webapp/dockerStart.sh" ]
