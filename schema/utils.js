/**
 * As mock data is removed, the data and helpers will be removed.
 * This file should not exist after the initial release.
 */

const topics = [
  { name: 'email', offset: 7126, partitions: 3 },
  { name: 'user', offset: 1263, partitions: 2 },
  { name: 'database', offset: 8723, partitions: 4 },
  { name: 'app', offset: 9421, partitions: 2 },
  { name: 'events', offset: 7231, partitions: 3 },
  { name: 'async', offset: 532, partitions: 3 },
  { name: 'log', offset: 72635, partitions: 3 },
  { name: 'highlight', offset: 986, partitions: 3 },
  { name: 'tasks', offset: 283, partitions: 3 },
  { name: 'search', offset: 8623, partitions: 3 },
  { name: 'tags', offset: 6234, partitions: 3 }
];


const zkMetrics = [
  { metric: 'Average Latency', value: 5 },
  { metric: 'Outstanding Requests', value: 3 },
  { metric: 'Received', value: 852 },
  { metric: 'Sent', value: 906 },
  { metric: 'File Descriptors', value: 2 },
  { metric: 'Mode', value: 'leader' },
  { metric: 'Pending Syncs', value: 3 },
  { metric: 'Followers', value: 8 },
  { metric: 'Heap Memory', value: '125M' },
  { metric: 'Version', value: '3.4.0' }
];

const kfMetrics = [
  { metric: 'UnderReplicatedPartitions', value: 1 },
  { metric: 'OfflinePartitionsCount', value: 2 },
  { metric: 'ActiveControllerCount', value: 3 },
  { metric: 'MessagesInPerSec', value: 18 },
  { metric: 'BytesInPerSec', value: 448 },
  { metric: 'BytesOutPerSec', value: 234 },
  { metric: 'RequestsPerSec', value: 25 },
  { metric: 'LogFlushRateAndTimeMs', value: 43 },
  { metric: 'LeaderElectionRateAndTimeMs', value: 22 },
  { metric: 'UncleanLeaderElectionsPerSec', value: 32 },
  { metric: 'Partition Count', value: 54 },
  { metric: 'Leader Count', value: 1 }
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const addLatency = (result, timeout = 0) => (
  new Promise(res => setTimeout(() => res(result), timeout))
);

const getTopics = (start, end) => topics.slice(start, end);

const db = {
  clusters: [
    { datacenter: 'ALB', address: 'roc-dvzoo01.amicillc.com:2181,roc-dvzoo02.amicillc.com:2181,roc-dvzoo03.amicillc.com:2181', alias: 'Development' }
  ],
  topics,
  zookeepers: [
    { hostname: 'zk-host01.amicillc.com', latency: 4, isLeader: true, metrics: zkMetrics },
    { hostname: 'zk-host02.amicillc.com', latency: 0, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host03.amicillc.com', latency: 1, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host04.amicillc.com', latency: 4, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host05.amicillc.com', latency: 0, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host06.amicillc.com', latency: 1, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host07.amicillc.com', latency: 4, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host08.amicillc.com', latency: 0, isLeader: false, metrics: zkMetrics },
    { hostname: 'zk-host09.amicillc.com', latency: 1, isLeader: false, metrics: zkMetrics }
  ],
  brokers: [
    { hostname: 'kf-broker01.amicillc.com', bytesUp: 324, bytesDown: 482, metrics: kfMetrics },
    { hostname: 'kf-broker02.amicillc.com', bytesUp: 723, bytesDown: 623, metrics: kfMetrics },
    { hostname: 'kf-broker03.amicillc.com', bytesUp: 152, bytesDown: 912, metrics: kfMetrics },
    { hostname: 'kf-broker04.amicillc.com', bytesUp: 178, bytesDown: 346, metrics: kfMetrics },
    { hostname: 'kf-broker05.amicillc.com', bytesUp: 462, bytesDown: 622, metrics: kfMetrics },
    { hostname: 'kf-broker06.amicillc.com', bytesUp: 836, bytesDown: 735, metrics: kfMetrics }
  ],
  consumers: [
    { group: 'email.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'async.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'portal.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'compliance.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'search.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'highlight.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'review.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'redaction.service', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'analytics.app', topics: getTopics(0, getRandomInt(1, 10)) },
    { group: 'review.app', topics: getTopics(0, getRandomInt(1, 10)) }
  ]
};

module.exports = {
  getTopics,
  getRandomInt,
  addLatency,
  db
};
