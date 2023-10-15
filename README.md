![Berlin Bites Logo](./client/src/logo/logo-simple-text-very-small-white.svg)
*a.k.a. Drop into Berlin*
## 📌 Summary
Berlin Bites, an NLP restaurant recommender on a MERN stack, fills the gap in personalized dining suggestions. It's machine learning engine employs pandas, SentenceTransformers, and scikit-learn to match user input to Google Maps reviews of Berlin restaurants. The app includes prompt and name-based search, filtering, and restaurant details according to the high-fidelity wireframes based on user needs determined by surveys. Front and backend are hosted on render.com, with a Flask API on pythonanywhere.com.

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

## Components
- Recommendation engine: SentenceTransformers and KNN model (PyTorch/scikit-learn)
- Frontend: JavaScript (ReactJS)
- Backend: Node (ExpressJS)
- Database: MongoDb
- Design: Figma

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

----

# Blog post
## Introduction
In this blog post, we explore the collaborative journey of building Berlin Bites, an NLP-based restaurant recommendation web application. This project addressed the challenge of personalized restaurant recommendations and involved contributions from various teams: User Experience & User Interface Design (UX/UI), Web Development (WD), and Data Science & Deep Learning (DS/DL).

## Contribution of each team
### User Experience & User Interface Design (UX / UI)
We conducted interviews and a user survey, in which 25 people participated. Through the survey, we found that many struggled to find dining spots that matched their tastes, especially when they required vegan or gluten-free options. Armed with this insight, we gathered with the team to brainstorm and collectively work on ideas.
During the process, we encountered our initial challenge. Given Berlin's vast size and diverse population, collecting our extensive research into a concise summary proved to be a challenging task. Nevertheless, we successfully combined our findings, creating our four distinct user personas, all rooted in the insights gathered during our research phase.
We created low-fidelity wireframes and continuously collaborated with the dev team to refine our designs. The team's input and multiple iterations led to a high-fidelity design with icons, buttons, text, and images.
We then faced the challenge of creating a prototype for our database-driven project. Despite some difficulties, we designed high-fidelity design prototypes we could use in User testing. The Web Dev team was able to put together a working version of the app so we could use that directly to do the user testing. In an unmoderated usability test, the participating users offered valuable insights which enabled us to refine and enhance our design by incorporating feedback from the testing process.

### 💻 Web development (WD)
The App is built in a github.com monorepo including a frontend React app, a backend Express app, a hosted Mongo database and a python recommender model. As the main functionality was kind of clear from the beginning, the WD team immediately started building a MERN framework. The first components focused on displaying small profile cards of restaurants with some information and a search bar to find them by name. The first bigger issues were data related, as our team lacked a data scientist. Due to the low quality of the initial data and issues arising from the .csv format, we opted for re-scraping it, using the unique identifiers of each restaurant. 
As the app grew, a backend server with a hosted database was implemented, the frontend code gained in complexity as well. This led to issues regarding state handling and therefore re-rendering. Furthermore, the chain of execution inside the code became complex as state updates are asynchronous. As we kept focus on main functionality, we could get ahead of these issues and were able to deploy the app days before the deadline, being able to test properly. 

The final app features 

- prompt based search with restaurant recommendation results
- name based search with suggestions
- both search modes include filtering by price & rating
- details page for every restaurant featuring
    - images (clickable)
    - info (name, address, price range)
    - reviews with profile images
    - possibility to add / delete reviews
- about page with info to the project and the team

### Data Science & Deep Learning (DS / DL)
#### Data Collection: Scraping Google Maps API
When building a machine learning model, one needs data to build on. Therefore, process of building our restaurant recommender commenced with the extraction of restaurant data from the Google Maps API. This data encompasses information like geographical coordinates, name, price, star rating, images, user-generated reviews and many more. It is the foundation for our restaurant recommendation system.

#### Leveraging NLP: SentenceTransformers and K-Nearest Neighbors (KNN)
We utilize the SentenceTransformers library, specifically the 'all-MiniLM-L6-v2' model, for natural language processing. This model converts restaurant reviews into high-dimensional embeddings, which subsequently become the cornerstone of our recommendation system. These embeddings are basically large vectors with numbers in them that not only represent the words in the text, but also carry semantic meaning. This allows us to transform both reviews and user input into these embeddings and then compare them against each other. In order to make sense of these embeddings, we employ the K-Nearest Neighbors (KNN) algorithm. Trained on SentenceTransformers' embeddings of all restaurants, the KNN model identifies the restaurants embeddings closest to the embeddings of the user input, enabling the personalization of
recommendations.

#### Deployment: Connecting the recommender to the web application
The technical infrastructure facilitating this system combines a React front-end with user-friendly and clean design, hosted on render.com, with a Mongo Atlas DB backend and a Flask API. The API takes the user input (minimum star rating, maximum price and text), creates embeddings from the text and runs them through the KNN model. It returns recommendations which are then filtered to be below or equal to the given maximum price and above or equal to the minimum star rating. The results are returned to the front-end as a JSON file with an ordered list based on similarity to the user input.

#### Conclusion
In summary, our project began with data collection and conducting surveys to determine the actual needs of our users. Based on these, the UX / UI Team created designs in figma, while the WD team built a typical MERN stack (Mongo DB, Express.js, React and Node.js) with basic functionality. Over time, a user-friendly interface with clean design for an efficient and satisfactory user experience was implemented along with features such as prompt- and name-based search, filtering, restaurant details pages, and an about page. In the background, our solution employs two models based on natural language processing and unsupervised machine learning (KNN) for personalized restaurant recommendations. These are deployed on pythonanywhere.com and served to the web application on render.com via post request and exposure through the flask-cors package. 
Our service aims to personalize restaurant selection for seekers of extraordinary culinary experiences in Berlin. 

<p style="text-align: center;">Please check us out at: 
  <br>
  <a href="https://berlin-bites-frontend.onrender.com/">Berlin Bites</a>
</p>


## 🗓 Timeline
This project started in the beginning of August and finished on October 15th 2023.

## Final presentation slides
[Final Presentation for TechLabs](https://docs.google.com/presentation/d/1QGYuuUdIFPASF5K6DiCjJbKI6ogCl_5IAXALWIXE2yM/edit#slide=id.p)