#Prevent No Space Errors



##Create Warning Notification

##Add Padding File
dd if=/dev/urandom of=delete_me_if_disk_full bs=1M count=10

ubuntu@ip-172-31-41-60:~$ ls -al delete_me 
-rw-rw-r-- 1 ubuntu ubuntu 10485760 Jun 20 14:14 delete_me

##Remove Packages
sudo apt-get autoremove




#Increase Size
https://medium.com/faun/resize-aws-ebs-4d6e2bf00feb


##Get Listing
xvda    202:0    0    9G  0 disk 
└─xvda1 202:1    0    8G  0 part /


##Grow
sudo growpart /dev/xvda 1


lsblk
xvda    202:0    0    9G  0 disk 
└─xvda1 202:1    0    9G  0 part /


sudo resize2fs /dev/xvda1


df -h
/dev/xvda1      8.7G  6.9G  1.9G  80% /
