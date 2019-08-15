#https://snyk.io/blog/10-docker-image-security-best-practices/
#docker build -t greatlakescode-node .

FROM ubuntu:18.04


RUN apt-get update
RUN apt-get install git -y


RUN apt-get install curl -Y

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -


RUN apt-get install nodejs -Y
RUN node -V
RUN npm -v


RUN nginx -v

RUN git clone https://github.com/greatlakescode/greatlakescode.git

RUN cd /greatlakescode/app/node_app

RUN npm install


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
