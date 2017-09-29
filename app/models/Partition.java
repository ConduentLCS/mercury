package models;

import java.util.List;

class Partition {
    private Integer id;
    private KafkaBroker leader;
    private List<KafkaBroker> replicas;
    private List<KafkaBroker> isr;

    /**
     * Latest offset, where the latest message gets added in.
     */
    private Long latestOffset;

    /**
     * Earliest offset, where the earliest(first) message is in.
     * Difference between latest offset and Earliest offset will give the total number of messages.
     */
    private Long earliestOffset;

    public Partition(Integer id, KafkaBroker leader, List<KafkaBroker> replicas, List<KafkaBroker> isr) {
        this.id = id;
        this.leader = leader;
        this.replicas = replicas;
        this.isr = isr;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public KafkaBroker getLeader() {
        return leader;
    }

    public void setLeader(KafkaBroker leader) {
        this.leader = leader;
    }

    public List<KafkaBroker> getReplicas() {
        return replicas;
    }

    public void setReplicas(List<KafkaBroker> replicas) {
        this.replicas = replicas;
    }

    public List<KafkaBroker> getIsr() {
        return isr;
    }

    public void setIsr(List<KafkaBroker> isr) {
        this.isr = isr;
    }

    public Long getLatestOffset() {
        return latestOffset;
    }

    public void setLatestOffset(Long latestOffset) {
        this.latestOffset = latestOffset;
    }

    public Long getEarliestOffset() {
        return earliestOffset;
    }

    public void setEarliestOffset(Long earliestOffset) {
        this.earliestOffset = earliestOffset;
    }

}
