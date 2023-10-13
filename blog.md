![logo](./client/src/logo/logo-simple-text-very-small-white.svg)



## An AI based restaurant recommender app
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

During the beginning project phase, we executed user research. This entailed an online survey, in-depth user interviews, thorough topic research, and engaging in brainstorming sessions.

We conducted a user survey, in which 25 people participated. Through which, we found many struggled to find dining spots that matched their tastes, especially when they required vegan or gluten-free options.

Armed with this insight, we gathered with the team to brainstorm to collectively work on ideas.

During the process, we encountered our initial challenge. Given Berlin's vast size and diverse population, collecting our extensive research into a concise summary proved to be a challenging task. Nevertheless, we successfully combined our findings, creating our four distinct user personas, all rooted in the insights gathered during our research phase.

We crafted the low-fidelity wireframes and continuously collaborated with the dev team to refine our designs in several iterations.

The team's input and multiple iterations led to a high-fidelity design with icons, buttons, text, and images.

We then faced the challenge of creating a prototype for our database-driven project. Despite some difficulties, we designed some high-fidelity design prototypes we could use in User testing. The dev team was able to put together a working version of the app so we could use that directly to do some user testing.

In an unmoderated usability test, the participating users offered some valuable insights for further improvements of the app.



