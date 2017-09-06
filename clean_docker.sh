#!/usr/bin/env bash

containers=`docker ps -a -q`

if [[ ! -z "$containers" ]];
    then
        echo "Stopping docker containers"
        docker stop $containers

        echo "Removing docker containers"
        docker rm $containers

        echo "cleaning docker 'docker system prune -a -f'"
        docker system prune -a -f
else
        echo "No active containers running"
fi
