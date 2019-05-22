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

echo "zipping project"


