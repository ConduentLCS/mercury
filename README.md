# mercury

> A tool for monitoring the Confluent platform.

## Table of contents
---
- [Front-End Development](#front-end-development)
  - [Scripts](#scripts)
- [Back-End Development](#back-end-development)
  - [Running Kafka Cluster locally using Docker](#running-kafka-cluster-using-docker)
  - [Clean up containers](#clean-up-containers)
  - [Starting the server](#starting-the-server)

## Back-End Development

### Running Kafka Cluster using Docker

Run the `start_kafka.sh` script to start docker instance
```bash
# Starting a Kafka Cluster | Single Node Zookeeper & Kafka
./start_kafka.sh
# Starting a Kafka Cluster | Multi Node Zookeeper & Kafka
./start_kafka.sh cluster
```

### Clean up containers
```bash
./clean_docker.sh
```

## Starting the server

### 1. Prerequisites
Play requires Java 1.8. To check that you have the latest JDK, please run:
```bash
java -version
``` 

### 2. Install SBT
Refer this [page](http://www.scala-sbt.org/download.html) for scala build tool (SBT) installation
   
### 3. Clone the repo
```bash
git clone git@gitlab.amicillc.com:mercury/mercury.git
```
   
### 4. Run `sbt run`
To start the development server run the below command
```bash
cd mercury 

./sbt run
```

## Front-End Development

### Scripts

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
