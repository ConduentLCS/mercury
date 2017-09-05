FROM java:latest

Add https://github.com/sbt/sbt/releases/download/v1.0.0/sbt-1.0.0.tgz /home

RUN  cp -r /home/sbt/ /usr/local/

# RUN  /home/sbt/bin/sbt 

Add . /home/mercury

WORKDIR /home/mercury 

RUN cd /home/mercury/ /home/sbt/bin/sbt compile

CMD  /home/sbt/bin/sbt run

EXPOSE 9000
