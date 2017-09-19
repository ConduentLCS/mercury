name := """mercury"""
organization := "com.conduent.clcs"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.2"

libraryDependencies += guice

// graphql dependencies
libraryDependencies += "com.graphql-java" % "graphql-java" % "4.0"
libraryDependencies += "com.graphql-java" % "graphql-java-tools" % "4.1.1"

// kafka related dependencies
libraryDependencies += "org.apache.kafka" % "kafka-clients" % "0.11.0.1"

