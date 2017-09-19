package models;

public class Cluster {
    private final String env;
    private final String description;

    public Cluster(String env, String description) {
        this.env = env;
        this.description = description;
    }

    public String getEnv() {
        return env;
    }

    public String getDescription() {
        return description;
    }
}
