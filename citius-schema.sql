-- MySQL dump 10.13  Distrib 5.7.21, for osx10.12 (x86_64)
--
-- Host: localhost    Database: citius
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `act`
--

DROP TABLE IF EXISTS `act`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=413 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `court`
--

DROP TABLE IF EXISTS `court`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `court` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=871 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `judgement`
--

DROP TABLE IF EXISTS `judgement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `judgement` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL DEFAULT '',
  `court_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `judgement_court_id` (`court_id`),
  CONSTRAINT `judgement_court_id` FOREIGN KEY (`court_id`) REFERENCES `court` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=957 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL DEFAULT '',
  `nif` int(10) unsigned NOT NULL,
  `people_type_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nif` (`nif`),
  KEY `people_people_type_id` (`people_type_id`),
  CONSTRAINT `people_people_type_id` FOREIGN KEY (`people_type_id`) REFERENCES `people_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2868 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `people_type`
--

DROP TABLE IF EXISTS `people_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(254) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(254) NOT NULL DEFAULT '',
  `reference` int(11) unsigned NOT NULL,
  `court_id` int(11) unsigned NOT NULL,
  `act_id` int(11) unsigned NOT NULL,
  `judgement_id` int(11) unsigned NOT NULL,
  `species` varchar(256) NOT NULL DEFAULT '',
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`),
  KEY `process_court_id` (`court_id`),
  KEY `process_act_id` (`act_id`),
  KEY `process_judgement_id` (`judgement_id`),
  CONSTRAINT `process_act_id` FOREIGN KEY (`act_id`) REFERENCES `act` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `process_court_id` FOREIGN KEY (`court_id`) REFERENCES `court` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `process_judgement_id` FOREIGN KEY (`judgement_id`) REFERENCES `judgement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2185 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `process_people`
--

DROP TABLE IF EXISTS `process_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_people` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `process_id` int(11) unsigned NOT NULL,
  `people_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `process_people_process_id` (`process_id`),
  KEY `process_people_people_id` (`people_id`),
  CONSTRAINT `process_people_people_id` FOREIGN KEY (`people_id`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `process_people_process_id` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-30 19:38:54
