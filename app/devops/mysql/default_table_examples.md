CREATE TABLE `report` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


alter table report add column test_1 text;

alter table report add column count_1 int;


CREATE TABLE `event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `created`     DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;