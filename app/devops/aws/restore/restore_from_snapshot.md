#About
I need to restore from a snapshot because a misconfigured sshd kicked me out of my
server. I can no longer use my key.



#Restore From Snapshot

##Stop Instance


##Detach Root
/dev/sda1


##Create New Volume From Snapshot
Make sure size and availablity zone match.


##Attach New Volume to instance
/dev/sda1


##Delete Old Volume


##Start Instance
