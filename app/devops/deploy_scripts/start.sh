#!/bin/bash
echo "start.sh started"
whoami
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


#TODO build and then change symbolic link for zero downtime
cd react_frontend
npm install
npm run build

