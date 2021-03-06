#Prereq
Install mailutils which includes postfix.

```sudo apt-get install mailutils```

##System mail name:
greatlakescode.us


#Set/Remove Throttling
https://www.linuxquestions.org/questions/linux-networking-3/sendmail-configuration-connection-timed-out-with-alt4-gmail-smtp-in-l-google-com-4175510482/
https://aws.amazon.com/premiumsupport/knowledge-center/ec2-port-25-throttle/

#Check IPV6
https://groups.google.com/forum/#!topic/mailing.postfix.users/6h4H5JfZrZU
https://serverfault.com/questions/585503/postfix-connection-timed-out-on-all-outbound-email

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

#Add DMARC
DMARC is a policy for reporting potential spam.

If quarantine is setup it can potentially block emails from reaching the recipient.
This is helpful in making sure your email is not spoofed but can make things hard to
debug.

##Add TXT to DNS
*._report._dmarc.gmail.com
v=DMARC1

_dmarc
v=DMARC1; p=quarantine; rua=mailto:russjohnson09@gmail.com; ruf=mailto:russjohnson09@gmail.com;  adkim=r; aspf=r; rf=afrf


##Test
https://mxtoolbox.com/SuperTool.aspx?action=dmarc%3agreatlakescode.us&run=toolpage



#Add SPF
SPF policy like dmarc can be added through the DNS config. Only for receiving
emails is additional config to postfix required.

##Add to DNS
TXT
@
v=spf1 mx a ip4:52.206.232.250 ~all

###Test Send
echo "Body: $(date)" | sudo mail -s "Subject: $(date)" russjohnson09@gmail.com -aFrom:admin@greatlakescode.us

Show original email and check Auth results.



#Add DKIM
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy
sudo apt-get install opendkim opendkim-tools

##Add User To opendkim Group
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

