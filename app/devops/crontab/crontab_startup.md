https://askubuntu.com/questions/814/how-to-run-scripts-on-start-up


sudo su ubuntu

#On Reboot
sudo crontab -e

@reboot sudo /home/ubuntu/greatlakescode/app/devops/deploy_scripts/reboot.sh
