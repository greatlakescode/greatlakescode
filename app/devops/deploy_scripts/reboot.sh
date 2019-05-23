#!/bin/bash
sudo su ubuntu
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"

cd $dir
echo $dir
echo "$(dir)/devops/deploy_scripts/start.sh"

/bin/bash "$(dir)/devops/deploy_scripts/start.sh"  >> /home/ubuntu/reboot.log 2>&1

