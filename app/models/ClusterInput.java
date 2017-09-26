package models;

public class ClusterInput {
    /**
     * Data center where this cluster belongs
     */
    private String datacenter;

    /**
     * Alias for the cluster
     */
    private String alias;

    /**
     * Kafka broker list separated by comma
     */
    private String kafkaBroker;

    /**
     * ClusterInput Constructor
     *
     */
    public ClusterInput() {
    }

    /**
     * ClusterInput Constructor
     *
     * @param datacenter
     * @param alias
     * @param kafkaBroker
     */
    public ClusterInput(String datacenter, String alias, String kafkaBroker) {
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

    public void setDatacenter(String datacenter) {
        this.datacenter = datacenter;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public void setKafkaBroker(String kafkaBroker) {
        this.kafkaBroker = kafkaBroker;
    }

}
