Mercury
=======

## Table of contents

- [Running Kafka Cluster locally using Docker](#running-kafka-cluster-locally-using-docker)


## Running Kafka Cluster locally using Docker

Run the start_kafka.sh script to start docker instance 

### Starting a kafka cluster single node zoookeper & kafka

```bash
./start_kafka.sh 
```

### Starting a kafka cluster with 3 node zookeeper & Kafka

```bash
./start_kafka.sh cluster
```

### Cleaning the docker containers

```bash
./clean_docker.sh
```
