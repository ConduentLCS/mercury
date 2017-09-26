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
    private final String kafkaBroker;

    /**
     * List of topics belong to the cluster
     */
    private List<Topic> topicList;

    /**
     * Cluster Constructor
     *
     * @param datacenter
     * @param alias
     * @param kafkaBroker
     */
    public Cluster(String datacenter, String alias, String kafkaBroker) {
        this.datacenter = datacenter;
        this.alias = alias;
        this.kafkaBroker = kafkaBroker;
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
    public  String getBrokerList(){
        return kafkaBroker;
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
     */
    public void setTopicList(List<Topic> topicList) {
        this.topicList = topicList;
    }
}
