#https://snyk.io/blog/10-docker-image-security-best-practices/
#docker build -t greatlakescode-node .

FROM ubuntu:18.04


#avoid tz interaction
#ENV TZ=America/New_York
#RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
#
#RUN apt-get install -y tzdata

#Configuring tzdata
#------------------
#
#Please select the geographic area in which you live. Subsequent configuration
#questions will narrow this down by presenting a list of cities, representing
#the time zones in which they are located.
#
#  1. Africa      4. Australia  7. Atlantic  10. Pacific  13. Etc
#  2. America     5. Arctic     8. Europe    11. SystemV
#  3. Antarctica  6. Asia       9. Indian    12. US
#Geographic area: 12

#RUN timedatectl list-timezones
#RUN cat /etc/timezone
RUN apt-get update
ENV TZ=America/New_York
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN mkdir -p /data/db

RUN apt-get install git wget curl -y
#RUN apt-get install git curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update

RUN apt-get install -y tzdata

RUN apt-get install -y mongodb-org

RUN apt-get install wget

RUN apt-get install nodejs -y
RUN apt-get install nginx -y
RUN apt-get install python2.7 -y
RUN apt-get install build-essential -y

RUN npm install -g typescript pm2







RUN git clone https://github.com/greatlakescode/greatlakescode.git

WORKDIR /greatlakescode/app/node_app

#install to speed up updates.
RUN pwd && npm install

RUN npm install

ENV GREATLAKESCODE_EMAIL_BASED_AUTH_JWT_SECRET test
ENV GREATLAKESCODE_STEAM_API_KEY test
ENV OPEN_WEATHER_MAP_API_KEY test


ENV GREATLAKESCODE_TX_EMAIL no.reply@greatlakescode.us
ENV GREATLAKESCODE_TX_EMAIL_SMTP smtp.zoho.com
ENV GREATLAKESCODE_TX_EMAIL_USER no.reply@greatlakescode.us
ENV GREATLAKESCODE_TX_EMAIL_PASS ZOHO_PASS_REPLACE_ME


#todo are these in use?
ENV GREATLAKESCODE_MYSQL_DB=greatlakescode
ENV GREATLAKESCODE_MYSQL_USERNAME=greatlakescode_app_user
ENV GREATLAKESCODE_MYSQL_PASSWORD=MYSQL_PASSWORD_REPLACE_ME

ENV GREATLAKESCODE_MYSQL_ADMIN=greatlakescode_admin
ENV GREATLAKESCODE_MYSQL_ADMIN_PASSWORD=REPLACE_ME_PASSWORD


#nginx configuration for serving frontend
#TODO can probably remove nginx from this. it is not required for node just php?

COPY localhost.conf /etc/nginx/sites-available/localhost.conf
RUN ln -s /etc/nginx/sites-available/localhost.conf /etc/nginx/sites-enabled/

#https://stackoverflow.com/questions/24241292/dockerized-nginx-is-not-starting/31507431
#RUN systemctl start nginx
#RUN systemctl enable nginx


WORKDIR /greatlakescode/app/react_frontend
RUN npm install

#prebuilt so something is available immediately
RUN npm run build


WORKDIR /
RUN mkdir kaneesha_wordpress && chown www-data kaneesha_wordpress
#TODO could have wordpress as its own image. doing this for now.
USER www-data
RUN git clone https://github.com/russjohnson09/kaneesha_wordpress.git
USER root

#RUN export DEBIAN_FRONTEND=noninteractive && apt-get -q -y install mysql-server
RUN apt-get install php-fpm php php-mysql nano iputils-ping -y

#https://askubuntu.com/questions/762339/mysql-server-installation-stuck-on-root-password
#ENV MYSQL_PWD Pwd1231
#RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
#RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
#RUN apt-get -y install mysql-server

#https://stackoverflow.com/questions/7739645/install-mysql-on-ubuntu-without-a-password-prompt
#RUN echo "mysql-server-5.5 mysql-server/root_password password root" | debconf-set-selections
#RUN echo "mysql-server-5.5 mysql-server/root_password_again password root" | debconf-set-selections
#RUN apt-get -y install mysql-server-5.5

#RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server

#RUN mysql -h127.0.0.1 -P3306 -uroot -e"UPDATE mysql.user SET password = PASSWORD('yourpassword') WHERE user = 'root'"

#RUN mysql --version
#RUN service mysql start && mysql -e "select 1;"

#RUN apt-get install sudo -E apt-get -q -y install mysql-server
#RUN apt-get -q -y install mysql-server
EXPOSE 3306

#TODO fix config
#COPY mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf
#RUN php -v

#RUN mysql -e "select 1"
#RUN service mysql start && mysql -e "select 1"


#RUN apt-get install php-fpm -y
#RUN apt-get install php-fpm php-mysql -y
#RUN apt-get install nano -y
#RUN apt-get install iputils-ping -y

RUN apt-get install postfix -y
RUN mkfifo /var/spool/postfix/public/pickup
RUN service postfix restart


RUN mkdir -p /public


RUN mkdir -p  /run/php/

COPY www.conf /etc/php/7.2/fpm/pool.d/www.conf


#WORKDIR /kaneesha_wordpress/wordpress-5.2.2
#TODO git clone as www-data user so that chown is not needed or something else to set ownership quickly
#RUN chown www-data:www-data wordpress -R
#RUN chown -R www-data:www-data /usr/share/nginx/html/

#todo remove
#RUN chmod -R 777 /usr/share/nginx/html/

#USER mysql

#TODO use volumes for docker-compose
#RUN mkdir /var/run/mysqld
#RUN ls /var/run/mysqld -al
#RUN chown mysql:mysql /var/run/mysqld
#USER root

#RUN chown mysql:mysql /var/run/mysqld/ -R
#https://stackoverflow.com/questions/52602293/fail-starting-mysql-in-my-ubuntu-docker
#usermod -d /var/lib/mysql mysql
#/etc/init.d/mysql restart

RUN apt-get install mysql-client -y

#TODO add kh.russjohnsonio.icu to /etc/hosts
#127.0.0.1       localhost kh.russjohnsonio.icu
#::1     localhost ip6-localhost ip6-loopback
#fe00::0 ip6-localnet
#ff00::0 ip6-mcastprefix
#ff02::1 ip6-allnodes
#ff02::2 ip6-allrouters
#172.17.0.2      41e55ac4e164

#RUN echo "127.0.0.1 kh.russjohnsonio.icu" >> /etc/hosts

#https://stackoverflow.com/questions/38302867/how-to-update-etc-hosts-file-in-docker-image-during-docker-build
#CMD echo "127.0.0.1 kh.russjohnsonio.icu" >> /etc/hosts; supervisord -n;


EXPOSE 443

#react frontend
EXPOSE 80
#node api.
EXPOSE 3000
#mongodb
EXPOSE 27017

#wordpress
EXPOSE 8080


COPY wp.conf /etc/nginx/sites-available/wp.conf
RUN ln -s /etc/nginx/sites-available/wp.conf /etc/nginx/sites-enabled/
COPY start.sh /start.sh

#mongodb volume
#VOLUME ["/data"]

#RUN service mysql start && mysql -uroot -e "create database greatlakescode;"


ENTRYPOINT ["/start.sh"]
#CMD ["/bin/bash", "setup.sh"]

#RUN apt-get update
#RUN apt-get upgrade


#RUN apt-get install unattended-upgrade
#RUN unattended-upgrade --dry-run -d


#
#RUN apt-install unattended-upgrades
#
#
#
#
#
#
#
#
#
#
#RUN echo "cached 2019-08-12" && unattended-upgrade --dry-run -d && apt-install unattended-upgrades


#RUN echo "cached 2019-08-12" && apt-get update &&  apt-get upgrade


#https://wiki.mumble.info/wiki/Main_Page


#docker build -t greatlakescode-node .
#docker rm -f greatlakescode-node && docker run --mount source=kaneesha_wordpress,target=/kaneesha_wordpress/wordpress-5.2.2/wordpress --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP -p 27017:27017 -p 3000:3000 -p 3306:3306  -p 8080:8080 -p 80:80 -p 443:443  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f


#docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP -p 3306:3306  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f
#docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f

#not usable for a little bit.
#docker logs greatlakescode-node -f


#docker exec -it greatlakescode-node /bin/bash
#docker exec -it node_app_web_1 /bin/bash

#curl http://kh.russjohnsonio.icu -L -v


#docker rm -f greatlakescode-node && docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP  --name greatlakescode-node greatlakescode-node:latest && docker exec -it greatlakescode-node /bin/bash
