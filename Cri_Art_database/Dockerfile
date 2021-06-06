
FROM docker.elastic.co/elasticsearch/elasticsearch:6.8.16

ENV ES_JAVA_OPTS="-Xms256m -Xmx256m"

CMD ["/usr/share/elasticsearch/bin/elasticsearch", "-E", "http.port=${PORT}", "-E", "discovery.type=single-node"]

