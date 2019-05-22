https://websiteforstudents.com/setup-retrictive-sftp-with-chroot-on-ubuntu-16-04-17-10-and-18-04/
https://www.digitalocean.com/community/tutorials/how-to-enable-sftp-without-shell-access-on-ubuntu-16-04

https://www.tecmint.com/restrict-sftp-user-home-directories-using-chroot/

#Install
sudo apt install openssh-server

sudo systemctl stop ssh.service
sudo systemctl start ssh.service
sudo systemctl enable ssh.service

#Add User
sudo useradd greatlakescode
sudo usermod -s /sbin/nologin greatlakescode
sudo passwd greatlakescode

sudo groupadd sftp_users
sudo usermod -aG sftp_users greatlakescode


#Create Shared SFTP Directory
sudo mkdir -p /home/sftp-shared
ls -al /var/sftp
sudo chown root:greatlakescode /var/sftp 

##Add Read Write To Group
sudo chmod 660 /var/sftp 

#Update Config
/etc/ssh/sshd_config

##Config specific to user group sftp_users
Add this to the end

Subsystem sftp internal-sftp

Match Group sftp_users
ForceCommand internal-sftp
PasswordAuthentication yes
ChrootDirectory /home
PermitTunnel no
AllowAgentForwarding no
AllowTcpForwarding no
X11Forwarding no



#Create Shared SFTP And Not Shared Home Directories
sudo mkdir -p /home/sftp-shared
sudo chmod 770 /home/sftp-shared
sudo chown root:sftp_users /home/sftp-shared

sudo chmod 700 /home/ubuntu
sudo chmod 700 /home/devadmin


sudo mkdir -p /home/greatlakescode
sudo chmod 700 /home/greatlakescode
sudo chown greatlakescode:greatlakescode /home/greatlakescode




#Add Second User
sudo adduser greatlakescode2
sudo usermod -s /sbin/nologin greatlakescode2
sudo passwd greatlakescode2
sudo usermod -aG sftp_users greatlakescode2


sudo mkdir -p /home/greatlakescode2
sudo chown greatlakescode2:greatlakescode2 /home/greatlakescode2
sudo chmod 700 /home/greatlakescode2


#Ensure Nginx Has Access
sudo chmod 770 /home/ubuntu
sudo chown ubuntu:www-data /home/ubuntu


#Test
C:\Users\russj\Documents\moc\greatlakescode\app\node_app>ssh greatlakescode@greatlakescode.us
greatlakescode@greatlakescode.us's password:
This service allows sftp connections only.
Connection to greatlakescode.us closed.
