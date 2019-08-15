https://www.howtoforge.com/tutorial/dockerizing-wordpress-with-nginx-and-php-fpm/


https://stackoverflow.com/questions/17570658/how-to-find-my-php-fpm-sock



nano /etc/php/7.2/fpm/pool.d/www.conf

https://www.cyberciti.biz/faq/how-to-reload-restart-php7-0-fpm-service-linux-unix/
systemctl start php-fpm


/etc/init.d/php7.2-fpm restart



root@6ec4e6345b95:/# cat /var/log/php7.2-fpm.log 
[15-Aug-2019 16:46:49] ERROR: Unable to create the PID file (/run/php/php7.2-fpm.pid).: No such file or directory (2)
[15-Aug-2019 16:46:49] ERROR: FPM initialization failed


 mkdir /run/php/
