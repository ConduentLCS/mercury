package common;

import org.apache.kafka.common.KafkaFuture;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class utils {
    public static <T> T executeFuture(KafkaFuture<T> kafkaFuture) throws InterruptedException, ExecutionException,
            TimeoutException {
       return kafkaFuture.get(1, TimeUnit.SECONDS);
    }
}
