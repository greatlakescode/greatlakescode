https://x-team.com/blog/docker-compose-php-environment-from-scratch/


multiple mysql databases for each container that might need it with
volumes shared...?

does node use it?

access can be controlled by a .env that is copied on startup?

https://stackoverflow.com/questions/22651647/docker-and-securing-passwords

 env_file:
- .env




The value in docker is around 

#mysql
Will be on host along with anything else that needs to persist.





host.docker.internal
