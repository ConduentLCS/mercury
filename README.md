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
To obtain the required packages for Mercury, you will need to install [Yarn](https://yarnpkg.com/)

### 2. Clone the repo
```bash
git clone git@gitlab.amicillc.com:mercury/mercury.git
```

### 3. Install Modules
Using the [Yarn](https://yarnpkg.com/) package manager, fetch the required modules.
```bash
# Install dependencies
yarn install
```
   
### 4. Start the application
To start the development server run the below command
```bash
# Start the development server
yarn run dev
```

## Front-End Development

### Scripts

``` bash
# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run all tests
yarn test
```
