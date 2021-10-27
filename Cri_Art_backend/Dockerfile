
FROM gradle:7.0.0-jdk11 AS build-stage
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle clean build --no-daemon -x test
##############################################################

FROM openjdk:11-jre-slim-buster

RUN groupadd spring && useradd spring -g spring
USER spring:spring

ARG JAR_FILE=/home/gradle/src/build/libs/Cri_Art.jar
COPY --from=build-stage ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Xmx256M", "-Dspring.profiles.active=prod", "-jar", "/app.jar"]