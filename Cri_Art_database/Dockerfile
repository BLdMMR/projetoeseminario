
FROM docker.elastic.co/elasticsearch/elasticsearch:7.13.1

ENV ES_JAVA_OPTS="-Xms256m -Xmx256m"

CMD ["/usr/share/elasticsearch/bin/elasticsearch", "-E", "http.port=${PORT}", "-E", "discovery.type=single-node"]

