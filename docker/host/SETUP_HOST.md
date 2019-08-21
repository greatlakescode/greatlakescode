#No nginx

#No listening on port 80


 apt-get install nginx -y


cp /root/greatlakescode/docker/host/greatlakescode.us.conf /etc/nginx/sites-available/greatlakescode.us.conf
ln -s /etc/nginx/sites-available/greatlakescode.us.conf /etc/nginx/sites-enabled/


systemctl enable nginx
systemctl restart nginx
