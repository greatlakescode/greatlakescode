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

echo "assuming project is running and up to date"
echo "zipping project $(pwd)"
rm node_app.zip || true
cd node_app
zip -r ./../node_app.zip . -x node_modules/\*

#zip -r node_app.zip ./node_app/* -x ./node_app/dist*
#zip -r node_app.zip ./node_app/* -x ./node_app/dist*
#zip -r node_app.zip node_app
sudo cp node_app.zip /home/greatlakescode/lambda
rm node_app.zip
