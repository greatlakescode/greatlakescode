#Namecheap Setup

#AWS Startup

##Remove Known Host
rm ~/.ssh/known_hosts


##Use pem file to ssh
ssh -i "node_monolith.pem"  ubuntu@greatlakescode.us

cat ~/.ssh/id_rsa.pub | ssh -i "node_monolith.pem"  ubuntu@greatlakescode.us "cat - >> ~/.ssh/authorized_keys"


##Copy .env
scp ubuntu@greatlakescode.us:/home/ubuntu/greatlakescode/app/node_app/.env .