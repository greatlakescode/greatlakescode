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
