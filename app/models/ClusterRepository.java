package models;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import common.constants;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.KafkaFuture;
import org.apache.kafka.common.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static common.utils.executeFuture;

public class ClusterRepository {
        private static final Logger log = LoggerFactory.getLogger(ClusterRepository.class);

        private final List<Cluster> clusters;
        private final Config applicationConfig;
    
        public ClusterRepository() {
            this.clusters = new ArrayList<>();
            this.applicationConfig = ConfigFactory.load();
        }

        public List<Cluster> getAllClusters() {
            File file = new File(this.applicationConfig.getString("cluster.config.path"));
            Config clusterConfig = ConfigFactory.parseFile(file);

            List<Config> clusterList = (List<Config>) clusterConfig.getConfigList("clusters");

            for (Config config: clusterList) {
                 Cluster cluster = new Cluster( config.getString("datacenter"),
                                                config.getString("description"),
                                                config.getString("bootstrapServers") );
                 clusters.add(cluster);
            }

            return clusters;
        }

        public void saveCluster(Cluster cluster) {
            clusters.add(cluster);
        }

        public Cluster getClusterInfo(ClusterInput clusterInput) throws InterruptedException, ExecutionException, TimeoutException {

            Cluster cluster = new Cluster(clusterInput.getDatacenter(), clusterInput.getAlias(),
                                          clusterInput.getBootstrapServers());

            Properties clientProp = new Properties();
            clientProp.setProperty(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, cluster.getBootstrapServers());
            clientProp.setProperty(AdminClientConfig.RECONNECT_BACKOFF_MS_CONFIG,
                    applicationConfig.getString(constants.BROKER_RECONNECT_BACKOFF_MS_CONFIG));

            AdminClient kfClient = KafkaAdminClient.create(clientProp);
            DescribeClusterResult clusterResult = kfClient.describeCluster();

            try {
                KafkaFuture<Collection<Node>> nodesFuture = clusterResult.nodes();
                ListTopicsOptions topicOption = new ListTopicsOptions();
                topicOption.listInternal(true);

                ListTopicsResult topicResult = kfClient.listTopics(topicOption);
                KafkaFuture<Set<String>> topicsFuture = topicResult.names();



                Collection<Node> brokerNodes = executeFuture(nodesFuture);
                Set<String> topics = executeFuture(topicsFuture);
                Map<String, TopicDescription> topicList= executeFuture(kfClient.describeTopics(topics).all());


                cluster.setTopicList(Topic.getTopicList(topicList));
                cluster.setKafkaBrokers(KafkaBroker.getBrokerList(brokerNodes));

            } catch (InterruptedException | ExecutionException | TimeoutException e) {
                e.printStackTrace();
                log.error(e.getMessage());
                throw e;
            } finally {
                kfClient.close(1, TimeUnit.MILLISECONDS);
            }

            return cluster;
        }
}
