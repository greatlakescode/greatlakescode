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


#diable deploy_lambda until I get it working consistently
#cd $dir
#./devops/deploy_scripts/lambda/deploy_lambda.sh
