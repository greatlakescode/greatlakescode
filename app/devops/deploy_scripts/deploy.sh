#!/bin/bash
cd "$(dirname "$0")"
dir="$(pwd)"
cd $dir

./nginx/nginx-deploy.sh

./start.sh
