#Add SPF Filtering
https://www.linode.com/docs/email/postfix/configure-spf-and-dkim-in-postfix-on-debian-8/
https://www.howtoforge.com/postfix_spf
https://www.digitalocean.com/community/tutorials/how-to-use-an-spf-record-to-prevent-spoofing-improve-e-mail-reliability



##Add SPF Policy Tools
sudo apt-get install opendkim opendkim-tools postfix-policyd-spf-python postfix-pcre



##Update Postfix Config

/etc/postfix/master.cf
policyd-spf  unix  -       n       n       -       0       spawn
    user=policyd-spf argv=/usr/bin/policyd-spf
    
/etc/postfix/main.cf
policyd-spf_time_limit = 3600

smtpd_recipient_restrictions =
    ...
    reject_unauth_destination,
    check_policy_service unix:private/policyd-spf,
    ...
    
    