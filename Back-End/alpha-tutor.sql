

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema alphaTutor
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema alphaTutor
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alphaTutor` DEFAULT CHARACTER SET latin1 ;
USE `alphaTutor` ;

-- -----------------------------------------------------
-- Table `alphaTutor`.`availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`availability` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`availability` (
  `availability_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `daily` VARCHAR(255) NULL DEFAULT NULL,
  `start_end` VARCHAR(255) NULL DEFAULT NULL,
  `start_time` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`availability_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 99
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `alphaTutor`.`cscourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`cscourses` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`cscourses` (
  `cs_course_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `coursecrn` VARCHAR(255) NULL DEFAULT NULL,
  `cs_course_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`cs_course_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `alphaTutor`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`role` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`role` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `role_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `alphaTutor`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`user` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`user` (
  `user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `UK_lqjrcobrh9jc8wpcar64q1bfh` (`user_name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `alphaTutor`.`tutor_availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`tutor_availability` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`tutor_availability` (
  `user_id` BIGINT(20) NOT NULL,
  `availability_id` BIGINT(20) NOT NULL,
  UNIQUE INDEX `UK_25hdqy8w5ssq97syk87e8fekj` (`availability_id` ASC),
  INDEX `FKf7moyj81h8a282g7bdtsbt540` (`user_id` ASC),
  CONSTRAINT `FK1qhh0h6yo32tct8arm7ja53rk`
    FOREIGN KEY (`availability_id`)
    REFERENCES `alphaTutor`.`availability` (`availability_id`),
  CONSTRAINT `FKf7moyj81h8a282g7bdtsbt540`
    FOREIGN KEY (`user_id`)
    REFERENCES `alphaTutor`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `alphaTutor`.`tutor_courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`tutor_courses` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`tutor_courses` (
  `user_id` BIGINT(20) NOT NULL,
  `course_id` BIGINT(20) NOT NULL,
  UNIQUE INDEX `UK_pou39mqjnen9xloek0il6s66c` (`course_id` ASC),
  INDEX `FK9ecd8k4cdrv5akrr9osryb38s` (`user_id` ASC),
  CONSTRAINT `FK2k4oy0kxce08t205w88hg615a`
    FOREIGN KEY (`course_id`)
    REFERENCES `alphaTutor`.`cscourses` (`cs_course_id`),
  CONSTRAINT `FK9ecd8k4cdrv5akrr9osryb38s`
    FOREIGN KEY (`user_id`)
    REFERENCES `alphaTutor`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `alphaTutor`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alphaTutor`.`user_role` ;

CREATE TABLE IF NOT EXISTS `alphaTutor`.`user_role` (
  `user_id` BIGINT(20) NOT NULL,
  `role_id` BIGINT(20) NOT NULL,
  UNIQUE INDEX `UK_it77eq964jhfqtu54081ebtio` (`role_id` ASC),
  INDEX `FK859n2jvi8ivhui0rl0esws6o` (`user_id` ASC),
  CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o`
    FOREIGN KEY (`user_id`)
    REFERENCES `alphaTutor`.`user` (`user_id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y`
    FOREIGN KEY (`role_id`)
    REFERENCES `alphaTutor`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
