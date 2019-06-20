#Namecheap Setup

#AWS Startup

##Remove Known Host
rm ~/.ssh/known_hosts


##Use pem file to ssh
ssh -i "node_monolith.pem"  ubuntu@greatlakescode.us

cat ~/.ssh/id_rsa.pub | ssh -i "node_monolith.pem"  ubuntu@greatlakescode.us "cat - >> ~/.ssh/authorized_keys"


##Copy .env
scp ubuntu@greatlakescode.us:/home/ubuntu/greatlakescode/app/node_app/.env .


##Add Reboot Scripts

###PM2
ubuntu@ip-172-31-41-60:~$ pm2 startup
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
