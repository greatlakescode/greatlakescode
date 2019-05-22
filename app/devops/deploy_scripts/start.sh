#!/bin/bash
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app

./devops/deploy_scripts/start_api


cd $dir
cd react_frontend
#TODO build and then change symbolic link for zero downtime
npm run build


cd $dir
./devops/deploy_scripts/lambda/deploy_lambda.sh
