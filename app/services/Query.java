package services;

import models.Cluster;
import models.ClusterRepository;

import java.util.List;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

public class Query implements GraphQLQueryResolver {

    private final ClusterRepository clusterRepository;

    public Query(ClusterRepository clusterRepository) {
        this.clusterRepository = clusterRepository;
    }

    public List<Cluster> clusters() {
        return clusterRepository.getAllClusters();
    }
}