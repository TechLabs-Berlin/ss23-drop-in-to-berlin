# ss23-drop-in-to-berlin

# How to run?
to run the project open terminal, navigate to the folder /dib and run:
npm i
npm run server

open a second terminal and run:
npm start

## Description
This project aims at creating personalized restaurant recommendations based on text input from the user, describing their desired restaurant. So far this is limited to the city of Berlin, Germany. The project is part of the Techlabs curriculum and reflects a joint effort of a group of Techies.

## Collaborators
UX / UI:
- Pratima Maharjan
- Kristina Ferenčak

Web Dev:
- Felix Reiter (Fullstack)
- Olimpiya Dimitrova (Frontend)

DS / DL:
- Leo Krohne
- special thanks to *Lukas Bauerschmidt* for the previous collaboration on this project and building the dataset!



## Type of project
This is a joint project to build a deep recommender web application that is characterized by a simple user flow and a lean design that enables users to quickly and effortlessly find restaurants according to their taste.

## Components
- the recommendation engine will be a deep neural network (PyTorch)
- the web application is built in JavaScript (ReactJS)
- the design is built with Figma

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

## Scope
- build a recommendation engine that utilizes deep learning
- build a web application that allows users to query the database for restaurant recommendations based on the DL engine
- provie simple user flow with clean design elements that enable the user to have minimal interaction with the interface

- optional:
    - train a model for classification of all restaurants into a given set of categories (multi-label classifier)
    - create functionality to allow users to add reviews directly on the web page
    - create user profiles
    - do testing with different designs to find optimal design
 
## Time
This project started in the beginning of August and will be finished by October 15th 2023. 
