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

ARC-Authentication-Results: i=1; mx.google.com;
       spf=pass (google.com: domain of admin@greatlakescode.us designates 52.206.232.250 as permitted sender) smtp.mailfrom=admin@greatlakescode.us;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=greatlakescode.us
       
       
echo "Body: $(date)" | sudo mail -s "Subject: $(date)" russj@detroitsoftware.com -aFrom:admin@greatlakescode.us
