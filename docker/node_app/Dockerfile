#https://snyk.io/blog/10-docker-image-security-best-practices/
#docker build -t greatlakescode-node .

FROM ubuntu:18.04


RUN apt-get update
RUN apt-get install git -y


RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -


RUN apt-get install nodejs -y
RUN node -v
RUN npm -v

RUN apt-get install nginx -y
RUN nginx -v

RUN git clone https://github.com/greatlakescode/greatlakescode.git

WORKDIR /greatlakescode/app/node_app

#This is an issue with node-gyp, it doesn't work with Python 3+.
RUN apt-get install python2.7 -y
RUN apt-get install build-essential -y
#RUN npm install bcrypt
RUN pwd && npm install


RUN npm install -g pm2

WORKDIR /greatlakescode/app/react_frontend


RUN npm install
RUN npm run build

RUN npm install -g typescript

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
RUN ln -s /etc/nginx/sites-available/localhost /etc/nginx/sites-enabled/

#https://stackoverflow.com/questions/24241292/dockerized-nginx-is-not-starting/31507431
#RUN systemctl start nginx
#RUN systemctl enable nginx


RUN npm install -g typescript

RUN apt-get install wget
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org



EXPOSE 80

COPY start.sh /start.sh
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
#docker rm -f greatlakescode-node && docker run -dP -p 80:80 -p 443:443  --name greatlakescode-node greatlakescode-node:latest && docker logs greatlakescode-node -f

#not usable for a little bit.
#docker logs greatlakescode-node -f


#docker exec -it greatlakescode-node /bin/bash

#2|greatlakescode_backup_2  | MongoNetworkError: failed to connect to server [localhost:27017] on first connect [Error: connect ECONNREFUSED 127.0.0.1:27017
