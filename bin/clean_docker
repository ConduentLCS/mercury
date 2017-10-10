#!/usr/bin/env bash

containers=`sudo docker ps -a -q`

if [[ ! -z "$containers" ]];
    then
        echo "Stopping docker containers"
        sudo docker stop $containers

        echo "Removing docker containers"
        sudo docker rm $containers

        echo "cleaning docker 'docker system prune -a -f'"
        sudo docker system prune -a -f
else
        echo "No active containers running"
fi
