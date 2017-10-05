package models;

import java.util.List;

public class Cluster {
    /**
     * Data center where this cluster belongs
     */
    private final String datacenter;

    /**
     * Alias for the cluster
     */
    private final String alias;

    /**
     * Kafka broker list separated by comma
     */
    private final String bootstrapServers;

    /**
     * List of topics belong to the cluster
     */
    private List<Topic> topicList;

    /**
     * List of kafka brokers to the cluster
     */
    private List<KafkaBroker> kafkaBrokers;


    /**
     * Cluster Constructor
     *
     * @param datacenter
     * @param alias
     * @param bootstrapServers
     */
    public Cluster(String datacenter, String alias, String bootstrapServers) {
        this.datacenter = datacenter;
        this.alias = alias;
        this.bootstrapServers = bootstrapServers;
    }

    /**
     * Returns the datacenter to which the cluster belongs
     *
     * @return datacenter the cluster belongs to
     * @see String
     */
    public String getDatacenter() {
        return datacenter;
    }

    /**
     * Returns the alias of a cluster
     *
     * @return alias of a cluster
     * @see String
     */
    public String getAlias() {
        return alias;
    }

    /**
     * Returns a broker list belongs to the cluster
     *
     * @return broker list the cluster belongs to
     * @see String
     */
    public String getBootstrapServers() {
        return bootstrapServers;
    }

    /**
     * Returns the list of topics belongs to the cluster
     *
     * @return topic list
     * @see List
     */
    public List<Topic> getTopics() {
        return topicList;
    }

    /**
     * Sets the topicList of a cluster
     *
     * @param topicList
     */
    public void setTopicList(List<Topic> topicList) {
        this.topicList = topicList;
    }

    public List<KafkaBroker> getKafkaBrokers() {
        return kafkaBrokers;
    }

    public void setKafkaBrokers(List<KafkaBroker> kafkaBrokers) {
        this.kafkaBrokers = kafkaBrokers;
    }
}
