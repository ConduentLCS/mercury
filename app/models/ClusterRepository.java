package models;

import java.util.ArrayList;
import java.util.List;

public class ClusterRepository {
        private final List<Cluster> clusters;

        public ClusterRepository() {
            clusters = new ArrayList<>();
            //add some clusters to start off with
            clusters.add(new Cluster("DEV", "Dev Cluster"));
            clusters.add(new Cluster("QA", "QA Cluster"));
        }

        public List<Cluster> getAllClusters() {
            return clusters;
        }

        public void saveCluster(Cluster cluster) {
            clusters.add(cluster);
        }
}
