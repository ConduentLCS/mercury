package models;

public class Cluster {
    private final String datacenter;
    private final String description;
    private final String broker_list;

    /**
     * @param datacenter
     * @param description
     * @param broker_list
     */
    public Cluster(String datacenter, String description, String broker_list) {
        this.datacenter = datacenter;
        this.description = description;
        this.broker_list = broker_list;
    }

    public String getDatacenter() {
        return datacenter;
    }

    public String getDescription() {
        return description;
    }

    public  String getBrokerList(){
        return broker_list;
    }
}
