#!/bin/bash
cd "$(dirname "$0")"
dir="$(pwd)"
cd $dir
cd $dir
cd ..
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app

cd node_app

echo "in node director $(pwd)"

echo "compile"
tsc

echo "npm install"
npm install

echo "zipping project $(pwd)"
#sudo apt-get install zip gzip tar
cd ..
zip -r node_app.zip node_app

#scp ubuntu@greatlakescode.us:/ubuntu/home/greatlakescode/app/node_app.zip