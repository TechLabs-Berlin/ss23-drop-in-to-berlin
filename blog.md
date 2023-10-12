![logo](./client/src/logo/logo-simple-text-small.svg)



# An AI based restaurant recommender app
<br>
<br>


## 📌 Summary  

Berlin Bites is an AI based app, that serves personalized restaurant recommendations, based on reviews.

Instead of searching by name or location, users enter a review like prompt.


>"A cozy place with authentic food, just like my mom’s. With friendly service and great wines as well."


The App is built in a monorepo including a frontend React app, a backend Express app, a hosted Mongo database and a python recommender model.

-----------
<br>

## 💻 Webdevelopment



As the main functionality was kind of clear from the beginning, the Web Development team was not waiting for the UX to be worked out, but started immediately building. The first components were focussing on displaying cards of restaurants and a search bar to find them by name. The first bigger issues were data related, as our team didn’t have any data scientists in it. The initial data, was neither completely usable, nor convertible in a clean way, which lead to the Webdevelopers re-scraping it from the google places API.



As the app grew and a  backend server with a hosted database were implemented, also the frontend code gained in complexity which led to issues regarding state handling and therefore re-rendering. Also the chain of execution inside the code became complex as state updates are asynchronous. By keeping focus on the main functionality, the team could get ahead of these issues and was able to deploy the app days before the deadline. Therefore it could be tested and reworked multiple times.

 ➡️ The final app features 
>- prompt based search with restaurant recommendation results
>- name based search with suggestions
>- both search modes include filtering by price & rating
>- Database with 4200 restaurants in Berlin
>- details page for every restaurant featuring
    - images (clickable)
    - info (name, address, price range)
    - reviews with profile images
    - possibility to add / delete reviews
>- about page with info to the project and the team

---------------
<br>

## 💡 Deep Learning

Deepleaaarning text

------------
<br>

## 📲 UX 

UX text comes here



