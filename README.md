Mercury
=======

## Table of contents

- [Running Kafka Cluster locally using Docker](#running-kafka-cluster-locally-using-docker)
- [Server development environment setup ](server_development_environment_setup)


## Running Kafka Cluster locally using Docker

Run the start_kafka.sh script to start docker instance 

##### Starting a kafka cluster single node zoookeper & kafka

```bash
./start_kafka.sh 
```

##### Starting a kafka cluster with 3 node zookeeper & Kafka

```bash
./start_kafka.sh cluster
```

##### Cleaning the docker containers

```bash
./clean_docker.sh
```

## Server development environment setup

#####1. Prerequisites
   
   Play requires Java 1.8. To check that you have the latest JDK, please run:
   ```bash
   java -version
   ``` 

#####2. Install SBT

   Refer this [page](http://www.scala-sbt.org/download.html) for scala build tool(SBT) installation
   
#####3. Clone the repo
   ```bash
   git clone git@gitlab.amicillc.com:mercury/mercury.git
   ```
   
#####4. Run sbt run
    To start the development server run the below command
    ```bash
    cd mercury 
 
    ./sbt run
    ```

