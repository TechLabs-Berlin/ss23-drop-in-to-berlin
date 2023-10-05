import ProfileCard from '../../components/ProfileCard/ProfileCard.js';
import Accordion from '../../components/Accordion/Accordion.js';
import './AboutPage.css';
import leoImage from './images/leo.jpg';
import olimpiyaImage from './images/olimpiya.jpg';
import felixImage from './images/felix.png';
import pratimaImage from './images/pratima.png';

const AboutPage = () => {
  const accordionSections = [
    {
      label: 'How it Works?',
      content: "Simply describe the type of restaurant you're looking for in the provided search field. Share your preferences by specifying its characteristics such as cuisine type,  ambiance or any other specific details you have in mind. The longer and detailed, the better. Once you've described your desired restaurant, our recommendation system will work its magic, delivering personalized suggestions finely tuned to your description. Find your ideal dining spot with ease and enjoy a dining experience that matches your tastes"
    },
    {
      label: 'How We Started?',
      content: 'We started as a part of the Techlabs curriculum with a mission to revolutionize restaurant discovery.'
    },
    {
      label: 'Why Choose Us?',
      content: 'Our unique approach uses natural language processing for a highly personalized experience.'
    },
    {
      label: 'Future Potentials',
        content: `This app could expand to other cities and include more features like table booking, location search, or mutiple recommendtion types.`
    }
  ];

  return (
    <div className="about-page">
      <h1 className="main-section-heading">About Us</h1>
      <p>We are a team of five students working on this project: one specializing in deep learning, two in web development, and two in UX design. Our collective enthusiasm and eagerness to learn from online resources drive us to continually expand our knowledge and skills, ensuring we deliver the best results for our project.</p>
      <Accordion sections={accordionSections} />
      
      <section className="how-to-use-section">
        <h2 className="main-section-heading">How to Use App - Demo Video</h2>
        <video controls>
          <source src="demo.mp4" type="video/mp4" />
        </video>
      </section>
      
      <section>
        <h2 className="main-section-heading">Our Team</h2>
        <div className="team-section">  
          <ProfileCard name="Felix" role="Web Developer" image={felixImage} website="https://www.linkedin.com/in/felix-reiter-7744941b4/" websiteLabel="Linkedin" />
          <ProfileCard name="Leo" role="Deep Learning" image={leoImage} website="https://www.linkedin.com/in/leo-krohne-03411725b/" websiteLabel="Linkedin" />
          <ProfileCard name="Olimpiya" role="Web Developer" image={olimpiyaImage} website="https://github.com/olympiaobr" websiteLabel="GitHub" />
          <ProfileCard name="Pratima" role="UX Design" image={pratimaImage} website="https://github.com/pr4t1ma" websiteLabel="GitHub" />
          <ProfileCard name="Kristina" role="UX Design" image="" website="" websiteLabel="" />
        </div>  
      </section>
      
      <section>
        <h2>Partners & Acknowledgements</h2>
        <p>We'd like to thank Techlabs for their support and mentorship.</p>
      </section>
      
      <section>
        
      </section>
    </div>
  );
};

export default AboutPage;