
#docker build -t wp .
FROM ubuntu:18.04

RUN apt-get update
#RUN apt-get upgrade -y

COPY debconf.selections /tmp/
RUN debconf-set-selections /tmp/debconf.selections

RUN apt-get install -y zip unzip
RUN apt-get install -y \
RUN apt-get install	php7.0 \
RUN apt-get install	php7.0-bz2 \
RUN apt-get install	php7.0-cgi \
RUN apt-get install	php7.0-cli \
RUN apt-get install	php7.0-common \
RUN apt-get install	php7.0-curl \
RUN apt-get install	php7.0-dev \
RUN apt-get install	php7.0-enchant \
RUN apt-get install	php7.0-fpm \
RUN apt-get install	php7.0-gd \
RUN apt-get install	php7.0-gmp \
RUN apt-get install	php7.0-imap \
RUN apt-get install	php7.0-interbase \
RUN apt-get install	php7.0-intl \
RUN apt-get install	php7.0-json \
RUN apt-get install	php7.0-ldap \
RUN apt-get install	php7.0-mbstring \
RUN apt-get install	php7.0-mcrypt \
RUN apt-get install	php7.0-mysql \
RUN apt-get install	php7.0-odbc \
RUN apt-get install	php7.0-opcache \
RUN apt-get install	php7.0-pgsql \
RUN apt-get install	php7.0-phpdbg \
RUN apt-get install	php7.0-pspell \
RUN apt-get install	php7.0-readline \
RUN apt-get install	php7.0-recode \
RUN apt-get install	php7.0-snmp \
	php7.0-sqlite3 \
	php7.0-sybase \
	php7.0-tidy \
	php7.0-xmlrpc \
	php7.0-xsl \
	php7.0-zip
RUN apt-get install apache2 libapache2-mod-php7.0 -y
RUN apt-get install mariadb-common mariadb-server mariadb-client -y
RUN apt-get install postfix -y
RUN apt-get install git nodejs npm composer nano tree vim curl ftp -y
RUN npm install -g bower grunt-cli gulp

ENV LOG_STDOUT **Boolean**
ENV LOG_STDERR **Boolean**
ENV LOG_LEVEL warn
ENV ALLOW_OVERRIDE All
ENV DATE_TIMEZONE UTC
ENV TERM dumb

COPY index.php /var/www/html/
COPY run-lamp.sh /usr/sbin/

RUN a2enmod rewrite
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN chmod +x /usr/sbin/run-lamp.sh
RUN chown -R www-data:www-data /var/www/html

VOLUME /var/www/html
VOLUME /var/log/httpd
VOLUME /var/lib/mysql
VOLUME /var/log/mysql
VOLUME /etc/apache2

EXPOSE 80
EXPOSE 3306

CMD ["/usr/sbin/run-lamp.sh"]
