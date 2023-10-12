![Berlin Bites Logo](./client/src/logo/logo-simple-text-very-small-white.svg)

## An AI based restaurant recommender app
----

<br>

## 💾 How to run

visit: https://berlin-bites-frontend.onrender.com/


to run the project locally:
- open terminal
- navigate to folder "api"
- run the commands:
  - npm i
  - node server.js

- open a second terminal
- navigate to the folder "client"
- run the command:
  - npm start

<br>

-------
## 📒 Description
This project aims at creating personalized restaurant recommendations based on text input from the user, describing their desired restaurant. So far this is limited to the city of Berlin, Germany. The project is part of the Techlabs curriculum and reflects a joint effort of a group of Techies.

<br>

-----
## 🐸 Collaborators
UX / UI:
- Pratima Maharjan
- Kristina Ferenčak

Web Development:
- Felix Reiter (Frontend + Backend)
- Olimpiya Dimitrova (Frontend)

DS / DL:
- Leo Krohne
- special thanks to *Lukas Bauerschmidt* for the previous collaboration on this project and building the dataset!


----

ISNT THIS THE SAME AS DESCRIPTION???

## Type of project
This is a joint project to build a deep recommender web application that is characterized by a simple user flow and a lean design that enables users to quickly and effortlessly find restaurants according to their taste.

-----

## Components
- Recommendation engine: deep neural network (PyTorch)
- Frontend: JavaScript (ReactJS)
- Backend: Node (ExpressJS)
- Database: MongoDb
- Design: Figma

------

IS THIS FOR THE README OR THE BLOGPOST?

## Dataset
- Source: Scraped via Google Maps API
- Shape: ca. 4.2k x 40 columns
- Extract of Features:
    - Name of location
    - Short description of the location
    - Location (Lattitude / Longitude)
    - Type of Location
    - Size of Location
    - Expensiveness
    - Nr. of reviews
    - Reviews
    - Instances: 1 Instance = 1 Location

----- 

SAME QUESTION HERE

## Scope
- build a recommendation engine that utilizes deep learning
- build a web application that allows users to query the database for restaurant recommendations based on the DL engine
- provie simple user flow with clean design elements that enable the user to have minimal interaction with the interface

- optional:
    - train a model for classification of all restaurants into a given set of categories (multi-label classifier)
    - create functionality to allow users to add reviews directly on the web page
    - create user profiles
    - do testing with different designs to find optimal design

<br>

----------

## 🗓 Timeline
This project started in the beginning of August and will be finished by October 15th 2023. 
