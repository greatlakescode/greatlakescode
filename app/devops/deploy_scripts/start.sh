#!/bin/bash
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app

./devops/deploy_scripts/start_api.sh


cd $dir
cd react_frontend
#TODO build and then change symbolic link for zero downtime
npm run build

