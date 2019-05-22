#!/bin/bash
cd "$(dirname "$0")"
dir="$(pwd)"
cd $dir
cd $dir
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app


cd $dir
cd devops/deploy_scripts
./nginx/nginx-deploy.sh

cd $dir
cd devops/deploy_scripts
./start.sh
