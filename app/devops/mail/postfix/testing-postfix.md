#Get DNS
dig greatlakescode.us TXT
dig _dmarc.greatlakescode.us TXT
dig mail._domainkey.greatlakescode.us TXT
dig *._report._dmarc.gmail.com TXT

#Sites

##MX Toolbox
https://mxtoolbox.com/domain/greatlakescode.us/

##Check TXT
https://mxtoolbox.com/SuperTool.aspx?action=a%3agreatlakescode.us&run=toolpage#


#Send Test Email
echo "Body: $(date)" | sudo mail -s "Subject: $(date)" russjohnson09@gmail.com -aFrom:admin@greatlakescode.us
