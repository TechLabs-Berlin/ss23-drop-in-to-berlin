import ProfileCard from '../../components/ProfileCard/ProfileCard.js';
import Accordion from '../../components/Accordion/Accordion.js';
import './AboutPage.css';
import { useState, useRef, useEffect } from 'react';
import leoImage from './images/leo.jpg';
import olimpiyaImage from './images/olimpiya.jpg';
import kristinaImage from './images/kristina.jpg';
import felixImage from './images/felix.jpg';
import pratimaImage from './images/pratima.jpg';
import NavBar from '../../components/NavBar/NavBar.js';
import techlabsLogo from '../../logo/techlabs-logo.png';

const AboutPage = () => {
  const backgroundImageRef = useRef(null);
  const [backgroundPositionY, setBackgroundPositionY] =
    useState('calc(50% + 2rem)');

  useEffect(() => {
    // Check if the ref is available (component has rendered)
    if (backgroundImageRef.current) {
      backgroundImageRef.current.style.backgroundPositionY =
        backgroundPositionY;
    }
  }, [backgroundPositionY]);

  const accordionSections = [
    {
      label: 'How it Works?',
      content: (
        <p>➡️ Simply describe the type of restaurant you're looking for in the provided search field. <br/>Share your preferences by specifying its characteristics such as cuisine type,  ambiance or any other specific details you have in mind. The longer and detailed, the better. Alternatively you can search by resaurant name.</p>)
    },
    {
      label: ' 📌 Summary Of The Project',
      content: (
        <p className='about-project-acc-content'>
          Berlin Bites is an AI based app, that serves personalized restaurant
          recommendations, based on reviews. Instead of searching by name or
          location, users enter a review like prompt.
          <br />
          <span className='about-project-acc-quote'>
            {' '}
            "A cozy place with authentic food, just like my moms. With friendly
            service and great wines as well."{' '}
          </span>
          The App is built in a monorepo including a frontend React app, a
          backend Express app, a python recommender model and a hosted Mongo
          database.
          <br />
          <br />

          The project began with data collection and conducting surveys to determine the actual needs of our users. Based on these, the UX / UI Team created designs in figma, while the WD team built a typical MERN stack (Mongo DB, Express.js, React and Node.js) with basic functionality. Over time, a user-friendly interface with clean design for an efficient and satisfactory user experience was implemented along with features such as prompt- and name-based search, filtering, restaurant details pages, and an about page. In the background, our solution employs two models based on natural language processing and unsupervised machine learning (KNN) for personalized restaurant recommendations. These are deployed on pythonanywhere.com and served to the web application on render.com via post request and exposure through the flask-cors package. Our service aims to personalize restaurant selection for seekers of extraordinary culinary experiences in Berlin.

          <br />
          <br />

          The project is built in multiple languages and prgrams:
          <ul className='about-project-acc-list'>
            <li>
              Recommender: SentenceTransformers and KNN model
              (PyTorch/scikit-learn)
            </li>
            <li>Frontend: JavaScript (ReactJS)</li>
            <li>Backend: Node (ExpressJS)</li>
            <li>Database: MongoDb</li>
            <li>Design: Figma</li>
          </ul>
        </p>
      ),
    },

    {
      label: 'UX & UI',
      content: (
        <p>
          We conducted interviews and a user survey, with 25 people. Through the
          survey, we found that many struggled to find dining spots that matched
          their tastes, especially when they required vegan or gluten-free
          options. Armed with this insight, we gathered with the team to
          brainstorm and collectively work on ideas. During the process, we
          encountered our initial challenge. <span className='about-project-acc-quote' > Given Berlin's vast size and
          diverse population, collecting our extensive research into a concise
          summary proved to be a challenging task. </span> Nevertheless, we
          successfully combined our findings, creating our four distinct user
          personas, all rooted in the insights gathered during our research
          phase. <br /> <br /> We created low-fidelity wireframes and
          continuously collaborated with the dev team to refine our designs. The
          team's input and multiple iterations led to a high-fidelity design
          with icons, buttons, text, and images. We then faced the challenge of
          creating a prototype for our database-driven project. Despite some
          difficulties, we designed high-fidelity design prototypes we could use
          in User testing. <br /> The Web Dev team was able to put together a
          working version of the app so we could use that directly to do the
          user testing. In an unmoderated usability test, the participating
          users offered valuable insights which enabled us to refine and enhance
          our design by incorporating feedback from the testing process.
        </p>
      ),
    },
    {
      label: 'Web Development',
      content: (
        <p>
          As the main functionality was kind of clear from the beginning, the WD
          team immediately started building the frontend. The first components
          focused on displaying small profile cards of restaurants and a search
          bar to find them by name. The first bigger issues were data related,
          as our team lacked a data scientist. Due to the low quality of the
          initial data and issues arising from its format, we opted for
          re-scraping it, using the unique identifiers of each restaurant.{' '}
          <br /> <br /> As the app grew, a backend server with a hosted database
          was implemented, the frontend code gained in complexity as well. This
          led to issues regarding state handling and therefore re-rendering.
          Furthermore, the chain of execution inside the code became complex as
          state updates are asynchronous. <br /> As we kept focus on main
          functionality, we could get ahead of these issues and were able to
          deploy the app days before the deadline, being able to test properly.
          <br />
          
          <ul className='about-project-acc-list'>
          <h2 className='about-project-acc-list-header' >The final app features:</h2>
            <li>prompt based search with restaurant recommendation results</li>
            <li>name based search with suggestions</li>
            <li>both search modes include filtering by price & rating</li>
            <li>
              details page for every restaurant featuring
              <ul className='about-project-acc-indented-list'>
                <li>images (clickable)</li>
                <li>info (name, address, price range)</li>
                <li>reviews with profile images</li>
                <li>possibility to add / delete reviews</li>
              </ul>
            </li>
            <li>about page with info to the project and the team</li>
          </ul>
        </p>
      ),
    },
    {
      label: 'Deep Learning',
      content: (
        <div>
        <h2 className='about-project-acc-sub-header' > Data Collection: Scraping Google Maps API</h2>
        <p>
          
          When building a machine learning model, one needs data to build on. Therefore, process of building our restaurant recommender commenced with the extraction of restaurant data from the Google Maps API. This data encompasses information like geographical coordinates, name, price, star rating, images, user-generated reviews and many more. It is the foundation for our restaurant recommendation system.
        </p>
        <h2 className= 'about-project-acc-sub-header' > Leveraging NLP: SentenceTransformers and K-Nearest Neighbors (KNN)</h2>
        <p>
          We utilize the SentenceTransformers library, specifically the 'all-MiniLM-L6-v2' model, for natural language processing. This model converts restaurant reviews into high-dimensional embeddings, which subsequently become the cornerstone of our recommendation system. These embeddings are basically large vectors with numbers in them that not only represent the words in the text, but also carry semantic meaning. This allows us to transform both reviews and user input into these embeddings and then compare them against each other. In order to make sense of these embeddings, we employ the K-Nearest Neighbors (KNN) algorithm. Trained on SentenceTransformers' embeddings of all restaurants, the KNN model identifies the restaurants embeddings closest to the embeddings of the user input, enabling the personalization of recommendations.
        </p>
        <h2 className= 'about-project-acc-sub-header' > Deployment: Connecting the recommender to the web application</h2>
        <p>
          The technical infrastructure facilitating this system combines a React front-end with user-friendly and clean design, hosted on render.com, with a Mongo Atlas DB backend and a Flask API. The API takes the user input (minimum star rating, maximum price and text), creates embeddings from the text and runs them through the KNN model. It returns recommendations which are then filtered to be below or equal to the given maximum price and above or equal to the minimum star rating. The results are returned to the front-end as a JSON file with an ordered list based on similarity to the user input.
        </p>
        </div>
      ),
    },
  ];

  const profiles = [
    {
      name: 'Felix',
      role: 'Fullstack Developer',
      image: felixImage,
      linkedin: 'https://www.linkedin.com/in/felix-reiter-7744941b4/',
      github: 'https://github.com/r1fel',
    },
    {
      name: 'Leo',
      role: 'Deep Learning',
      image: leoImage,
      linkedin: 'https://www.linkedin.com/in/leo-krohne-03411725b/',
      github: 'https://github.com/Phylanxy',
    },
    {
      name: 'Olimpiya',
      role: 'Web Developer',
      image: olimpiyaImage,
      github: 'https://github.com/olympiaobr',
    },
    {
      name: 'Pratima',
      role: 'UX Design',
      image: pratimaImage,
      github: 'https://github.com/pr4t1ma',
      linkedin: 'https://www.linkedin.com/in/pratima-maharjan/',
    },
    {
      name: 'Kristina',
      role: 'UX Design',
      image: kristinaImage,
      linkedin: 'www.linkedin.com/in/kristina-ferencak',
    },
  ];

  const renderedProfiles = profiles.map((profile) => (
    <ProfileCard
      name={profile.name}
      role={profile.role}
      image={profile.image}
      linkedin={profile.linkedin}
      github={profile.github}></ProfileCard>
  ));

  return (
    <div className='about-page-wrapper'>
      <section className='about-page-header-section' ref={backgroundImageRef}>
        <NavBar />
        <h1 className='section-heading margin-top'>About Us</h1>
      </section>
      <div className='about-page'>
        <p className='about-text'>
          We are a team of five students working on this project: one
          specializing in deep learning, two in web development, and two in UX
          design. Our collective enthusiasm and eagerness to learn from online
          resources drive us to continually expand our knowledge and skills,
          ensuring we deliver the best results for our project.
        </p>

        <Accordion
          sections={accordionSections}
          className='about-page-accordion'
        />

        {/* <section className="how-to-use-section">
        <h2 className="main-section-heading">How to Use App - Demo Video</h2>
        <video controls>
          <source src="demo.mp4" type="video/mp4" />
        </video>
      </section> */}

        <section>
          <h2 className='section-heading border-bottom'>Our Team</h2>
          <div className='team-section'>{renderedProfiles}</div>
        </section>
      </div>
      <section className='about-footer'>
        <h2 className='about-footer-headline'>Acknowledgements</h2>
        <p>
          Thanks to{' '}
          <a href='https://techlabs.org/' target='_blank'>
            {' '}
            <img src={techlabsLogo} className='techlabs-logo' />
          </a>
        </p>
        and our mentors Rashmi Carol Dsouza & Andrés Castañeda
      </section>
    </div>
  );
};

export default AboutPage;
