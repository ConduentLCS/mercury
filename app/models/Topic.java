package models;

import org.apache.kafka.clients.admin.TopicDescription;
import org.apache.kafka.common.TopicPartitionInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Topic {

    /**
     * Name of the topic
     */
    private String name;

    /**
     * Number of partitions in a topic
     */
    private int noOfPartitions;

    /**
     * is this topic internal
     */
    private boolean isInternal;


    private List<Partition> partitions;


   /**
     * Topic Constructor
     *
     * @param name
     * @param isInternal
     * @param noOfPartitions
     */
    public Topic(String name, boolean isInternal, int noOfPartitions) {
        this.name = name;
        this.isInternal=isInternal;
        this.noOfPartitions = noOfPartitions;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNoOfPartitions(int noOfPartitions) {
        this.noOfPartitions = noOfPartitions;
    }

    public boolean isInternal() {
        return isInternal;
    }

    public void setInternal(boolean internal) {
        isInternal = internal;
    }


    public String getName() {
        return name;
    }


    public int getNoOfPartitions() {
        return noOfPartitions;
    }

    public List<Partition> getPartitions() {
        return partitions;
    }

    public void setPartitions(List<Partition> partitions) {
        this.partitions = partitions;
    }
    
    public static List<Topic> getTopicList(Map<String, TopicDescription> topicListingMap){
        List<Topic> topicList = new ArrayList<>();
        topicListingMap.forEach(
                (String name, TopicDescription details) -> {
                    Topic topic = new Topic(name, details.isInternal(), details.partitions().size());
                    List<Partition> partitionList = new ArrayList<>();
                    for (TopicPartitionInfo partitionInfo: details.partitions()) {
                        Integer id = partitionInfo.partition();
                        KafkaBroker leader = KafkaBroker.getObject(partitionInfo.leader());
                        List<KafkaBroker> replicas = KafkaBroker.getBrokerList(partitionInfo.replicas());
                        List<KafkaBroker> isr = KafkaBroker.getBrokerList(partitionInfo.isr());

                        Partition partition = new Partition(id, leader,replicas,isr);
                        partitionList.add(partition);
                    }
                    topic.setPartitions(partitionList);
                    topicList.add(topic);
                });
        return  topicList;
    }
}

