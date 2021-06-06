
FROM elasticsearch:7.8.0

WORKDIR /usr/share/elasticsearch

# RUN rm -rf plugins
# RUN mkdir plugins

USER elasticsearch

ENV ES_JAVA_OPTS="-Xms256m -Xmx256m"

VOLUME data

CMD elasticsearch -E http.port=${PORT} -E discovery.type=single-node

