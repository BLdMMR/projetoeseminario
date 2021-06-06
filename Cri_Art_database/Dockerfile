
FROM docker.elastic.co/elasticsearch/elasticsearch:7.13.1

WORKDIR /usr/share/elasticsearch

RUN chown -R elasticsearch:elasticsearch .

USER elasticsearch

ENV ES_JAVA_OPTS="-Xms256m -Xmx256m"

VOLUME data

CMD elasticsearch -E http.port=${PORT} -E discovery.type=single-node

