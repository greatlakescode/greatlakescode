#!/bin/bash
cd "$(dirname "$0")"
dir="$(pwd)"
cd $dir
cd $dir
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app

cd node_app

./nginx/nginx-deploy.sh

./start.sh
