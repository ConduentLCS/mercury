package services;

import models.Cluster;
import models.ClusterInput;
import models.ClusterRepository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

public class Query implements GraphQLQueryResolver {

    private final ClusterRepository clusterRepository;

    public Query(ClusterRepository clusterRepository) {
        this.clusterRepository = clusterRepository;
    }

    public List<Cluster> clusters() {
        return clusterRepository.getAllClusters();
    }

    public Cluster cluster(ClusterInput clusterInput) throws InterruptedException, ExecutionException, TimeoutException {
        return clusterRepository.getClusterInfo(clusterInput);
    }
}