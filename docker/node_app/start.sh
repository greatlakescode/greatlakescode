#!/usr/bin/env bash

echo "STARTING v 1.0"
whoami

#TODO better way of doing this with a service?
echo "mongodb start"
#service mongod start
#-logpath data/db/log
mongod --bind_ip_all --dbpath=/data/db &

echo "start nginx"
service nginx start

cd /greatlakescode/app/node_app
git pull


echo "STARTING backend build"
npm install
tsc
cd pm2/prod
pwd
pm2 startOrGracefulReload greatlakescode.pm2.config.js
pm2 startOrGracefulReload greatlakescode_backup.pm2.config.js

echo "STARTING frontend build"

cd /greatlakescode/app/react_frontend

npm install
npm run build

pm2 logs


tail -f /dev/null
