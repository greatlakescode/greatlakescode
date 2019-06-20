https://askubuntu.com/questions/903354/difference-between-systemctl-and-service-commands/903405




#service --status-all
```
ubuntu@ip-172-31-41-60:~$ sudo service --status-all
 [ - ]  acpid
 [ + ]  apparmor
 [ + ]  apport
 [ + ]  atd
 [ - ]  console-setup.sh
 [ + ]  cron
 [ - ]  cryptdisks
 [ - ]  cryptdisks-early
 [ + ]  datadog-agent
 [ - ]  datadog-agent-process
 [ + ]  datadog-agent-trace
 [ + ]  dbus
 [ + ]  ebtables
 [ + ]  grub-common
 [ - ]  hibagent
 [ - ]  hwclock.sh
 [ - ]  irqbalance
 [ + ]  iscsid
 [ - ]  keyboard-setup.sh
 [ + ]  kmod
 [ - ]  lvm2
 [ + ]  lvm2-lvmetad
 [ + ]  lvm2-lvmpolld
 [ + ]  lxcfs
 [ - ]  lxd
 [ - ]  mdadm
 [ - ]  mdadm-waitidle
 [ + ]  mongodb
 [ + ]  mysql
 [ + ]  nginx
 [ - ]  open-iscsi
 [ - ]  open-vm-tools
 [ + ]  opendkim
 [ - ]  plymouth
 [ - ]  plymouth-log
 [ + ]  postfix
 [ + ]  postgresql
 [ + ]  procps
 [ + ]  redis-server
 [ - ]  rsync
 [ + ]  rsyslog
 [ - ]  screen-cleanup
 [ + ]  ssh
 [ + ]  sysstat
 [ + ]  udev
 [ + ]  ufw
 [ + ]  unattended-upgrades
 [ - ]  uuidd
```