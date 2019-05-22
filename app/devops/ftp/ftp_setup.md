https://www.tecmint.com/install-ftp-server-in-ubuntu/

#Install
sudo apt-get install vsftpd


#Enable
sudo service vsftpd start
sudo systemctl enable vsftpd

#Copy Config
/etc/vsftpd.conf
/etc/vsftpd.userlist
sudo service vsftpd restart


#Open AWS Ports
sudo service vsftpd restart
