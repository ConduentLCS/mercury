package models;

public class Cluster {
    private final String datacenter;
    private final String description;
    private final String kafkaBroker;

    /**
     * @param datacenter
     * @param description
     * @param broker_list
     */
    public Cluster(String datacenter, String description, String kafkaBroker) {
        this.datacenter = datacenter;
        this.description = description;
        this.kafkaBroker = kafkaBroker;
    }

    public String getDatacenter() {
        return datacenter;
    }

    public String getDescription() {
        return description;
    }

    public  String getBrokerList(){
        return kafkaBroker;
    }
}
