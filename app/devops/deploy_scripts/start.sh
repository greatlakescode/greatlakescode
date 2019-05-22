#!/bin/bash
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app

cd node_app


npm install
tsc
cd pm2/prod
pwd
pm2 startOrGracefulReload greatlakescode.pm2.config.js
pm2 startOrGracefulReload greatlakescode_backup.pm2.config.js
pwd

cd $dir
pwd
cd react_frontend
pwd
npm install


#TODO build and then change symbolic link for zero downtime
npm run build


cd $dir
./devops/deploy_scripts/lambda/deploy_lambda.sh
