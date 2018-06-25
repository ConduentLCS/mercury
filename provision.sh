#!/usr/bin/env bash

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
wget -qO - http://packages.confluent.io/deb/3.3/archive.key | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] http://packages.confluent.io/deb/3.3 stable main"

# Install yarn g++ & confluent
sudo apt-get update && sudo apt-get install yarn g++ openjdk-7-jre-headless confluent-platform-oss-2.11  -y

# Install NVM 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

command -v nvm

nvm install 6

confluent start kafka

kafka-topics --zookeeper localhost:2181 --topic test --partitions 1 --replication-factor 1 --create

echo '0001,{"name":"Jeff", "title":"Developer"}' | kafka-console-producer  --broker-list localhost:9092 --topic test --property parse.key=true --property key.separator=,
echo '0002,{"name":"Jeff", "title":"Developer"}' | kafka-console-producer  --broker-list localhost:9092 --topic test --property parse.key=true --property key.separator=,

cd /vagrant 

yarn install 