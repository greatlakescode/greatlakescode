#Prereq
Install mailutils which includes postfix.

```sudo apt-get install mailutils```

##System mail name:
greatlakescode.us


#Send Test Mail
echo "ping" | sudo mail -s "ping" russjohnson09@gmail.com -aFrom:admin@greatlakescode.us
##Check Spam Folder


#Configure Postfix Adding Encryption
/etc/postfix/main.cf
##TLS parameters
smtpd_tls_cert_file=/etc/letsencrypt/live/greatlakescode.us/fullchain.pem
smtpd_tls_key_file=/etc/letsencrypt/live/greatlakescode.us/privkey.pem
smtpd_use_tls=yes
smtpd_tls_auth_only = yes
smtp_tls_security_level = may
smtpd_tls_security_level = may
smtpd_sasl_security_options = noanonymous, noplaintext
smtpd_sasl_tls_security_options = noanonymous

Success 2019-05-21 10:44



#Add SPF
https://www.linode.com/docs/email/postfix/configure-spf-and-dkim-in-postfix-on-debian-8/
https://www.howtoforge.com/postfix_spf

https://www.digitalocean.com/community/tutorials/how-to-use-an-spf-record-to-prevent-spoofing-improve-e-mail-reliability
TXT @ "v=spf1 mx a ip4:52.206.232.250 ~all"

##Add SPF Policy Tools
sudo apt-get install opendkim opendkim-tools postfix-policyd-spf-python postfix-pcre

##Add User To opendkim Group
sudo adduser postfix opendkim


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
    
    


#Add DKIM
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy
sudo apt-get install opendkim opendkim-tools
sudo adduser postfix opendkim

##Test Send
I am testing on every step in the process to make sure these still
go out properly.

echo "Body: $(date)" | sudo mail -s "Subject: $(date)" russjohnson09@gmail.com -aFrom:admin@greatlakescode.us

##Add Milter (Mail filter)
/etc/postfix/main.cf
milter_protocol = 2
milter_default_action = accept

sudo service postfix restart

##Add Required Directory
sudo mkdir /etc/opendkim/keys -p

##Add Configs
sudo nano /etc/opendkim/TrustedHosts

###Add Signing Config
Ensure KeyTable and SigningTable have matches

sudo nano /etc/opendkim/KeyTable
sudo nano /etc/opendkim/SigningTable


##Add Keys
According to the default config for the KeyTable add the actual key.

sudo mkdir /etc/opendkim/keys/greatlakescode.us -p
cd /etc/opendkim/keys/greatlakescode.us

sudo opendkim-genkey -s mail -d greatlakescode.us

##Add Appropriate ownership
sudo chown opendkim:opendkim /etc/opendkim/keys/greatlakescode.us/mail.private

##Copy Public Key to DNS
sudo cat /etc/opendkim/keys/greatlakescode.us/mail.txt

TXT
mail._domainkey.greatlakescode.us
v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtdNUU8C25gpmuY4YVoPAa3vi+1DhAHQa5oG4sdYgNBpO8kkelzKPgHlpj2FTGboYXo3xEOHcaYDgTPsi91ys0V10ENirngg5zoK1ar6/tf7B6vfkgbbWlDuwhgZjCWGuUb0szahxmhiedbD9kt6gO7bZ46rqh7gul7AIPMRx7RPCha753mUtxp400rmrAeEW3g37U27pFIdH8l

##Restart And Send Test
sudo service postfix restart
sudo service opendkim restart
echo "Body: $(date)" | sudo mail -s "Subject: $(date)" russjohnson09@gmail.com -aFrom:admin@greatlakescode.us
echo "Body: $(date)" | sudo mail -s "Subject: $(date)" check-auth@verifier.port25.com -aFrom:admin@greatlakescode.us


#Configure Postfix To Send
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-14-04

