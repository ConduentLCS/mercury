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

if [[ $1 == "cluster"]];
 then
   cd docker/cluster
else
   cd docker/single-node
fi

docker-compose create

docker-compose start

docker-compose ps


