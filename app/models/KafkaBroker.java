package models;

import org.apache.kafka.common.Node;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class KafkaBroker {

    private Integer id;
    private String hostname;
    private Integer port;
    private String rack;
    private String metrics;

    public KafkaBroker(Integer id, String hostname, Integer port, String rack, String metrics) {
        this.id = id;
        this.hostname = hostname;
        this.port = port;
        this.rack = rack;
        this.metrics = metrics;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getRack() {
        return rack;
    }

    public void setRack(String rack) {
        this.rack = rack;
    }

    public String getMetrics() {
        return metrics;
    }

    public void setMetrics(String metrics) {
        this.metrics = metrics;
    }



    public static List<KafkaBroker> getBrokerList(Collection<Node> brokerNodes) {
        List<KafkaBroker> brokerList = new ArrayList<>();
        brokerNodes.forEach(node -> brokerList.add(new KafkaBroker(node.id(), node.host(), node.port(), node.rack(), null)));
        return brokerList;
    }

    public static KafkaBroker getObject(Node node) {
        return new KafkaBroker(node.id(), node.host(), node.port(), node.rack(), null);
    }
}
