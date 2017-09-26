package models;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import controllers.GraphQLController;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

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
                                                config.getString("kafkaBroker") );
                 clusters.add(cluster);
            }
            
            return clusters;
        }

        public void saveCluster(Cluster cluster) {
            clusters.add(cluster);
        }

        public Cluster getClusterInfo(ClusterInput clusterInput) throws InterruptedException, ExecutionException, TimeoutException {
            log.error("Getting Cluster");
            Cluster cluster = new Cluster(clusterInput.getDatacenter(), clusterInput.getAlias(),
                                          clusterInput.getBrokerList());
            Properties clientProp = new Properties();
            clientProp.setProperty(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, cluster.getBrokerList());

            try {
                log.info("Getting Client");
                AdminClient kfClient = KafkaAdminClient.create(clientProp);
                log.error("Getting kafka describe cluster");
                DescribeClusterResult clusterResult = kfClient.describeCluster();
                log.error("Getting nodes from kafka cluster");
                System.out.println(clusterResult.nodes().get(5, TimeUnit.MILLISECONDS));
                ListTopicsOptions topicOption = new ListTopicsOptions();
                topicOption.listInternal(true);
                ListTopicsResult topicResult = kfClient.listTopics(topicOption);
                System.out.println(topicResult.names().get(10, TimeUnit.SECONDS));
                kfClient.close(1, TimeUnit.MILLISECONDS);
            } catch (InterruptedException | ExecutionException | TimeoutException e) {
                e.printStackTrace();
                log.error(e.getMessage());
                throw e;
            }

            return cluster;
        }
}
