FROM openjdk:11-jre-slim-buster

RUN groupadd spring && useradd spring -g spring
USER spring:spring

ARG JAR_FILE=build/libs/Cri_Art.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]