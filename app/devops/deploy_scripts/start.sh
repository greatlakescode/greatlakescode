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
pm2 startOrGracefulReload russj.pm2.config.js
pm2 startOrGracefulReload russj_backup.pm2.config.js
pwd

cd $dir
pwd
cd react_frontend
pwd
npm install

npm run build





