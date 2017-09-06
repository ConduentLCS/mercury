#!/usr/bin/env bash
#
# start a kafka cluster using docker
#

# Create a docker virtual machine to start kafka cluster 
docker-machine create --driver virtualbox --virtualbox-memory 6000 confluent

# start the docker machine
docker-machine start confluent

# set docker environment
docker-machine env confluent

eval $(docker-machine env confluent)

if [[ "$1" ==  "cluster" ]];
 then
    cd docker/cluster
else
    echo "change directory to single node"
    cd docker/single-node
fi

echo `pwd`

docker-compose create

docker-compose start

docker-compose ps

docker ps -a



