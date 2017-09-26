package models;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.Node;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ClusterRepository {
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

        public Cluster getClusterInfo(ClusterInput clusterInput){
            Cluster cluster = new Cluster(clusterInput.getDatacenter(), clusterInput.getAlias(),
                                          clusterInput.getBrokerList());
            Properties clientProp = new Properties();
            clientProp.setProperty(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, cluster.getBrokerList());
            AdminClient kfClient = KafkaAdminClient.create(clientProp);
            DescribeClusterResult cluserResult = kfClient.describeCluster();
            try {
                ArrayList<Node> defaultList = new ArrayList<>();
                defaultList.add(Node.noNode());
                System.out.println(cluserResult.nodes().getNow(defaultList));
                ListTopicsOptions topicOption = new ListTopicsOptions();
                topicOption.listInternal(true);
                ListTopicsResult topicResult = kfClient.listTopics(topicOption);
                System.out.println(topicResult.names().getNow(Collections.emptySet()));
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }


            kfClient.close(1, TimeUnit.MILLISECONDS);
            return cluster;
        }
}
