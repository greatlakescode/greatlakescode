#!/bin/bash
cd "$(dirname "$0")"
git pull
dir="$(pwd)"
cd $dir
cd ..
cd ..
dir="$(pwd)"

cd $dir
echo $dir

whoami

#exit

./devops/deploy_scripts/start.sh

