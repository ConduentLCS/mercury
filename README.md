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
- [GraphQL Schema](#graphql-schema)

## Back-End Development
---
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
---
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

## GraphQL Schema
---
```graphql
type Cluster {
  # Datacenter identifier
  datacenter: String

  # Zookeeper connection string for a cluster
  zookeeperString: String

  # Alias or helping text for cluster identification
  alias: String

  # Collection of topics from the cluster
  topics: [Topic]

  # Zookeeper nodes from a cluster
  zookeepers: [Zookeeper]
  zookeeper(hostname: String!): Zookeeper

  # Kafka Brokers that are active in a given cluster
  kafkaBrokers: [KafkaBroker]
  kafkaBroker(hostname: String!): KafkaBroker

  # Consumer groups registed in a given cluster
  consumers: [Consumer]
  consumer(group: String!): Consumer
}

type Consumer {
  group: String
  topicCount: Int
  topics: [Topic]
}

# The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
scalar JSON

type KafkaBroker {
  hostname: String
  bytesUp: Int
  bytesDown: Int
  metrics: JSON
}

type Message {
  offset: String
  partition: Int
  timestamp: String
  data: String
}

type Query {
  cluster(address: String!): Cluster
  clusters: [Cluster]
}

type Subscription {
  newMessage(topic: String!): Message
}

type Topic {
  name: String
  offset: Int
  partitions: Int
}

type Zookeeper {
  hostname: String
  metrics: JSON
  latency: Int
  isLeader: Boolean
}
```
