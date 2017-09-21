package models;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

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
                 Cluster cluster = new Cluster(config.getString("datacenter"), config.getString("description"), config.getString("broker_list")) ;
                 clusters.add(cluster);
            }
            
            return clusters;
        }

        public void saveCluster(Cluster cluster) {
            clusters.add(cluster);
        }
}
