GSU Tutor App
-------------
>The product is a way for GSU students CS students to connect with the tutors in the GSU CS tutoring center.  This is done by having a weekly schedule with each day showing the tutors available that day in the center and the hours they will be working. From there the student can select a tutors bringing up a profile for that tutor with various info ( Contact info etc.).

Motivation
----------
>Gives the students a better idea of the help they can receive based on the course they are enrolled in along with the info the app provides about available tutors at the current time/day.  This allows the student to go to the tutoring center at the most advantageous time for them. Increasing the efficiency of the operation of a tutoring center.

Framework used
--------------
>Built with Java Spring Boot

Features:
-------------
>Gives the students a better idea of the help they can receive based on the course they are enrolled in along with the info the app provides about available tutors at the current time/day.  This allows the student to go to the tutoring center at the most advantageous time for them. Increasing the efficiency of the operation of a tutoring center.

Installation
------------
>Note: This is the instructions for whom using Mac or Linux 

>Back-end software:
>1. Make sure you have Java installed. (Version 1.8)
>You can install brew (dependency management package) by following this https://brew.sh/
 Once you install brew, you can install Java by brew cask install java
>2. Make sure you have Maven install 
>brew install maven 

>Front-end software:
>1. Make sure you have Node js and NPM install 
>sudo apt-get install -y nodejs
>2. Install essential package for Node js
>sudo apt-get install -y build-essential
>3. Install React
>sudo npm install -g create-react-app

How to use?
-----------
>(*) Clone the project from https://github.com/anocero4133/CSC-SWE-AlphaTeam-
>Back-end: 
1. Navigate to Backend/alphaTutor-java-MainService
2. Build the jar file using the command : mvn package
3. Run the application : java -jar target/alphaTutor-1.0-SNAPSHOT.jar
4. The application will run on localhost:8080


>Front-end:
1. Navigate to Front-End/Web-Dev/alpha-tutor/
2. Install necessary dependencies: npm i or npm install 
3. Run the application: npm start
4. The application will run on localhost:3000

>Host:
The code has been deployed to heroku, you can access the services 
Front-end: https://tutor-gsu.herokuapp.com/

>If you want to see all the available API resources , you can go to https://tutor-service-back-end.herokuapp.com/swagger-ui.html

