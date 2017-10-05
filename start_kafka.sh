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

sudo docker-compose create

sudo docker-compose start

sudo docker-compose ps

sudo docker ps -a


docker run \
  --net=host \
  --rm confluentinc/cp-kafka:3.3.0 \
  kafka-topics --create --topic test --partitions 1 --replication-factor 1 --if-not-exists --zookeeper localhost:32181


