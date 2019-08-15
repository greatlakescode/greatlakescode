select Host,User from mysql.user;



GRANT ALL PRIVILEGES ON *.* TO 'test'@'%' IDENTIFIED BY 'test' WITH GRANT OPTION;
FLUSH PRIVILEGES;



https://stackoverflow.com/questions/3715925/localhost-vs-127-0-0-1-in-mysql-connect/3715946#targetText=%22localhost%22%20means%20local%20socket%20connection,.0.1%20is%20TCP%2FIP.&targetText=If%20you%20want%20to%20use,leave%20the%20server%20field%20blank.

cannot connect using localhost but can with 127.0.0.1???

no, just a java bug? sequel pro can connect okay. just informing me that socket is available.



