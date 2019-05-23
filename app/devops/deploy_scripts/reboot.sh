#!/bin/bash
sudo su ubuntu
whoami
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"
echo $dir #should be app

./devops/deploy_scripts/start.sh

