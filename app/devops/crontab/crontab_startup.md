https://askubuntu.com/questions/814/how-to-run-scripts-on-start-up


sudo su ubuntu

#On Reboot
@reboot sudo su ubuntu && sudo /home/ubuntu/greatlakescode/app/devops/deploy_scripts/reboot.sh >> /home/ubuntu/reboot.log 2>&1
