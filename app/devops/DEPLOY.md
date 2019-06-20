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

###Main Reboot Script
sudo cp /home/ubuntu/greatlakescode/app/devops/deploy_scripts/systemd/greatlakescode.service /lib/systemd/system
sudo ls /lib/systemd/system/greatlakescode.service
sudo systemctl start greatlakescode
sudo systemctl status greatlakescode
sudo journalctl -u greatlakescode

sudo systemctl enable greatlakescode


###PM2 (skipped if main reboot takes care of startup)
ubuntu@ip-172-31-41-60:~$ pm2 startup
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
