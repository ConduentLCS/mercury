package models;

public class Cluster {
    private final String datacenter;
    private final String description;

    public Cluster(String datacenter, String description) {
        this.datacenter = datacenter;
        this.description = description;
    }

    public String getDatacenter() {
        return datacenter;
    }

    public String getDescription() {
        return description;
    }
}
