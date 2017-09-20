package models;

import com.sun.org.apache.xpath.internal.operations.Bool;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.typesafe.config.ConfigValue;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ClusterRepository {
        private final List<Cluster> clusters;

        public ClusterRepository() {
            clusters = new ArrayList<>();
            //add some clusters to start off with
            clusters.add(new Cluster("DEV", "Dev Cluster"));
            clusters.add(new Cluster("QA", "QA Cluster"));
        }

        public List<Cluster> getAllClusters() {
            File file = new File("conf/cluster.conf");
            Config config = ConfigFactory.parseFile(file);

            Config clusterConfig = config.getConfig("clusters");

            System.out.println(clusterConfig);
            return clusters;
        }

        public void saveCluster(Cluster cluster) {
            clusters.add(cluster);
        }
}
