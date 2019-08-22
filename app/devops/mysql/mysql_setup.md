#Install
apt-get install mysql-server


#Allow mysql remote connections

```
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf 

#bind-address            = 127.0.0.1
bind-address            = 0.0.0.0

sudo service mysql restart
```


#Create Admin User Local SSH Only

Copy add password and terminate with ;

CREATE USER 'greatlakescode_admin'@'localhost' IDENTIFIED BY 'password'          ;
GRANT ALL PRIVILEGES ON *.* TO 'greatlakescode_admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION   ;

##Update Password
ALTER USER 'greatlakescode_admin'@'localhost' IDENTIFIED BY 'newPass';

FLUSH PRIVILEGES;






#Create Application Database With Remote User
https://www.a2hosting.com/kb/developer-corner/mysql/managing-mysql-databases-and-users-from-the-command-line
https://linuxize.com/post/how-to-create-mysql-user-accounts-and-grant-privileges/



CREATE DATABASE greatlakescode;
DROP USER greatlakescode_app_user@localhost;

CREATE USER 'greatlakescode_app_user'@'localhost' IDENTIFIED BY 'user_password'          ;

GRANT ALL PRIVILEGES ON greatlakescode.* TO 'greatlakescode_app_user'@'localhost' IDENTIFIED BY 'password'         ;
GRANT ALL PRIVILEGES ON greatlakescode.* TO 'greatlakescode_app_user'@'%' IDENTIFIED BY 'password'         ;

FLUSH PRIVILEGES;



#Create User

CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'user_password';
