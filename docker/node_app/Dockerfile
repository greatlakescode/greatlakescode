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
#TODO could have wordpress as its own image. doing this for now.
RUN git clone https://github.com/russjohnson09/kaneesha_wordpress.git

#RUN apt-get install sudo -E apt-get -q -y install mysql-server
RUN apt-get -q -y install mysql-server
EXPOSE 3306


COPY mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf
#RUN php -v

#RUN mysql -e "select 1"
#RUN service mysql start && mysql -e "select 1"


RUN apt-get install php -y
RUN apt-get install php-fpm -y
RUN apt-get install php-fpm php-mysql -y
RUN apt-get install nano -y

COPY wp.conf /etc/nginx/sites-available/wp.conf
RUN ln -s /etc/nginx/sites-available/wp.conf /etc/nginx/sites-enabled/

RUN mkdir -p /public


RUN mkdir -p  /run/php/

COPY www.conf /etc/php/7.2/fpm/pool.d/www.conf





#react frontend
EXPOSE 80
#node api.
EXPOSE 3000
#mongodb
EXPOSE 27017

#wordpress
EXPOSE 9001


COPY start.sh /start.sh

#mongodb volume
#VOLUME ["/data"]


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
#docker rm -f greatlakescode-node && docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP -p 3001:80 -p 27017:27017 -p 3000:3000 -p 3306:3306  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f


#docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP -p 3306:3306  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f
#docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f

#not usable for a little bit.
#docker logs greatlakescode-node -f


#docker exec -it greatlakescode-node /bin/bash



#docker rm -f greatlakescode-node && docker run --mount source=mongo,target=/data --mount source=mysql,target=/var/lib/mysql -dP  --name greatlakescode-node greatlakescode-node:latest && docker exec -it greatlakescode-node /bin/bash
