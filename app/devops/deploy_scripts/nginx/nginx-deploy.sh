#!/bin/bash
cd "$(dirname "$0")"
dir="$(pwd)"
cd $dir


sudo cp "./greatlakescode.us.conf" "/etc/nginx/sites-available/greatlakescode.us.conf" -vvv
sudo ln -s "/etc/nginx/sites-available/greatlakescode.us.conf" "/etc/nginx/sites-enabled/greatlakescode.us.conf" || true


sudo service nginx restart
wait
sleep 2
printf "\n\n"

lines="====================================================================================\n"
printf "$lines You will be asked to update certs. If there are no certs to update you can cancel\n$lines"
printf "\n\n"

#sudo /home/ubuntu/certbot-auto --authenticator webroot -w /home/ubuntu/public --installer nginx
certbot
sudo service nginx restart

wait
sleep 2


cat /etc/nginx/sites-available/greatlakescode.us.conf