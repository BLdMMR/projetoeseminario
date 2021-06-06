
FROM docker.elastic.co/elasticsearch/elasticsearch:7.13.1

WORKDIR ./app

COPY --chown=elasticsearch:elasticsearch . .

USER elasticsearch

ENV ES_JAVA_OPTS="-Xms256m -Xmx256m"

VOLUME /usr/share/elasticsearch/data

CMD /usr/share/elasticsearch/bin/elasticsearch -E http.port=${PORT} -E discovery.type=single-node

