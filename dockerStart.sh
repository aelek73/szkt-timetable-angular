#!/bin/sh

cd /home/node/szkt-timetable-backend && node index.js &
cd /home/node/szkt-timetable-webapp && ng serve --proxy-config proxy.json
