https://websiteforstudents.com/setup-retrictive-sftp-with-chroot-on-ubuntu-16-04-17-10-and-18-04/
https://www.digitalocean.com/community/tutorials/how-to-enable-sftp-without-shell-access-on-ubuntu-16-04
#Install
sudo apt install openssh-server

sudo systemctl stop ssh.service
sudo systemctl start ssh.service
sudo systemctl enable ssh.service

#Add User
sudo useradd greatlakescode
sudo passwd greatlakescode

sudo groupadd sftp_users
sudo usermod -aG sftp_users greatlakescode

#Create Shared SFTP Directory
sudo mkdir -p /var/sftp
ls -al /var/sftp
sudo chown root:greatlakescode /var/sftp 

#Update Config
/etc/ssh/sshd_config

##Config specific to user group sftp_users
Add this to the end

Match Group sftp_users
ForceCommand internal-sftp
PasswordAuthentication yes
ChrootDirectory /var/sftp
PermitTunnel no
AllowAgentForwarding no
AllowTcpForwarding no
X11Forwarding no


sudo systemctl restart ssh.service






