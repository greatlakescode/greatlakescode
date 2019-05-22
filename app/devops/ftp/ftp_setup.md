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

#Add User
ubuntu@ip-172-31-41-60:~/greatlakescode/app/devops/ftp$ sudo useradd greatlakescode
ubuntu@ip-172-31-41-60:~/greatlakescode/app/devops/ftp$ sudo passwd greatlakescode



#Open AWS Ports
20 21


#Test FTP
ftp greatlakescode@greatlakescode.us


