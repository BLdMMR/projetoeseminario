FROM elasticsearch:7.7.0

WORKDIR /usr/share/elasticsearch

USER elasticsearch

ENV ES_JAVA_OPTS="-Xms64m -Xmx64m"

VOLUME data

CMD elasticsearch -E http.port=${PORT} -E discovery.type=single-node
