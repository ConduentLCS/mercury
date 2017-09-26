package models;

public class Topic {

    /**
     * Name of the topic
     */
    private final String name;

    /**
     * Latest offset, where the latest message gets added in.
     */
    private final Long latestOffset;

    /**
     * Earliest offset, where the earliest(first) message is in.
     * Difference between latest offset and Earliest offset will give the total number of messages.
     */
    private final Long earliestOffset;

    /**
     * Number of partitions in a topic
     */
    private final int noOfPartitions;


    /**
     * Topic Constructor
     *
     * @param name
     * @param latestOffset
     * @param earliestOffset
     * @param noOfPartitions
     */
    public Topic(String name, Long latestOffset, Long earliestOffset, int noOfPartitions) {
        this.name = name;
        this.latestOffset = latestOffset;
        this.earliestOffset = earliestOffset;
        this.noOfPartitions = noOfPartitions;
    }

    public Long getLatestOffset() {
        return latestOffset;
    }

    public String getName() {
        return name;
    }

    public Long getEarliesTOffset() {
        return earliestOffset;
    }

    public int getNoOfPartitions() {
        return noOfPartitions;
    }
}
