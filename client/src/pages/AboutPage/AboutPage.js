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
import techlabsLogo from '../../logo/techlabs-logo.png'

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
      content:
        "Simply describe the type of restaurant you're looking for in the provided search field. Share your preferences by specifying its characteristics such as cuisine type,  ambiance or any other specific details you have in mind. The longer and detailed, the better. Alternatively you can search by resaurant name.",
    },
    {
      label: 'Summary Of The Project',
      content: (
        <p className='about-project-acc-content'>Berlin Bites is an AI based app, that serves personalized restaurant recommendations, based on reviews. Instead of searching by name or location, users enter a review like prompt.
        <br/>
        <br/>
        <span className='about-project-acc-quote'> A cozy place with authentic food, just like my moms. With friendly service and great wines as well. </span>
        
        The App is built in a monorepo including a frontend React app, a backend Express app, a hosted Mongo database and a python recommender model.`,
        </p>

      ),
        
    },
    {
      label: 'UX & UI',
      content:
        'Our unique approach uses natural language processing for a highly personalized experience.',
    },
    {
      label: 'Future Potentials',
      content: `This app could expand to other cities and include more features like table booking, location search, or mutiple recommendtion types.`,
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
      linkedin:'www.linkedin.com/in/kristina-ferencak',
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

        <Accordion sections={accordionSections} />

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
            Thanks to <a href='https://techlabs.org/' target="_blank"> <img src={techlabsLogo} className='techlabs-logo'/></a>
          </p>
          and our mentors Rashmi Carol Dsouza & Andrés Castañeda
        </section>
    </div>
  );
};

export default AboutPage;
