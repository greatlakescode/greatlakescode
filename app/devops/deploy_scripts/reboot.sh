#!/bin/bash
sudo su ubuntu
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"

./devops/deploy_scripts/start.sh  >> /home/ubuntu/reboot.log 2>&1

