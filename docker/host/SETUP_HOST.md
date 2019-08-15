 apt-get install nginx -y


cp /root/greatlakescode/docker/host/greatlakescode.us.conf /etc/nginx/sites-available/greatlakescode.us.conf
ln -s /etc/nginx/sites-available/greatlakescode.us.conf /etc/nginx/sites-enabled/
