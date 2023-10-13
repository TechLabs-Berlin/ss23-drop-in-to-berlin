# Berlin Bites (formerly known as Drop into Berlin)
This project aims at creating personalized restaurant recommendations based on text input from the user, 
describing their desired restaurant. So far this is limited to the city of Berlin, Germany. The project is part of 
the TechLabs curriculum and reflects a joint effort of a group of Techies.

# Summary
## Collaborators
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
This is a joint project to build an NLP-based restaurant recommendation web application that is characterized by a 
simple user flow and a lean design that enables users to quickly and effortlessly find restaurants according to their 
taste. To achieve this, the user inputs a text description of the restaurant they are looking for.
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

-----

## Components
- Recommendation engine: SentenceTransformers and a KNN model (PyTorch/scikit-learn)
- Frontend: JavaScript (ReactJS)
- Backend: Node (ExpressJS)
- Database: MongoDb
- Design: Figma

------

## Dataset
- Source: Scraped via Google Maps API
- Shape: ca. 4.2k x 40 columns
- Extract of Features:
    - Name of location
    - Short description of the location
    - Location (Lattitude / Longitude)
    - Type of Location
    - Size of Location
    - Price
    - Star rating
    - Nr. of reviews
    - Reviews
    - Instances: 1 Instance = 1 Location

----- 

## 🗓 Timeline
This project started in the beginning of August and finished on October 15th 2023.

# Blog post
## Data Collection: Uncovering the Restaurant Landscape
The process commenced with the extraction of restaurant data from Google Maps using the Google Maps API. This data 
encompasses information like geographical coordinates, name, price, star rating, images, user-generated reviews and 
many more. This data forms the foundation for our restaurant recommendation system.

## Keyword Analysis: Capturing Restaurant Characteristics

To represent the attributes of each restaurant, we employ a keyword analysis approach based on KeyBERT. This is a 
keyword extraction tool, which systematically reviews restaurant-related texts, identifying and isolating salient 
keywords that encapsulate the unique characteristics of each dining establishment. These keywords serve as a first-impression
representation of the restaurants, easily visible on the website.

## Leveraging NLP: SentenceTransformers and K-Nearest Neighbors (KNN)

We utilize the SentenceTransformers library, specifically the 'all-MiniLM-L6-v2' model, for natural language processing. 
This model converts restaurant reviews into high-dimensional embeddings, which subsequently become the cornerstone of 
our recommendation system. These embeddings are basically large vectors with numbers in them that not only represent the 
words in the text, but also carry semantic meaning. This allows us to transform both reviews and user input into these 
embeddings and then compare them against each other. In order to make sense of these embeddings, we employ the 
K-Nearest Neighbors (KNN) algorithm. Trained on SentenceTransformers' embeddings of all restaurants, the KNN model 
identifies the restaurants embeddings closest to the embeddings of the user input, enabling the personalization of 
recommendations.

## Backend stuff: Connecting the recommender to the web application

The technical infrastructure facilitating this system combines a React front-end with user-friendly and clean design, 
hosted on render.com, with a Mongo Atlas DB backend and a Flask API. The API takes the user input 
(minimum star rating, maximum price and text), creates embeddings from the text and runs them through the KNN model. It returns
recommendations which are then filtered to be below or equal to the given maximum price and above or equal to the minimum
star rating. The results are returned to the front-end as a JSON file with an ordered list based on similarity to the user input.

## In Conclusion

In conclusion, our approach begins with comprehensive data collection, employs AI-driven natural language processing and 
KNN for personalized recommendations, and integrates a user-friendly interface for an efficient user experience. This 
approach aims to streamline restaurant selection processes without unnecessary embellishments.

