import './ProfileCard.css'
import {IoLogoLinkedin, IoLogoGithub} from 'react-icons/io5';

const ProfileCard = ({ name, role, image, linkedin, github }) => {
    return (
      <div className="profile-card">
        <img src={image} alt={`${name}'s profile`} className="team-profile-img" />
        <h3 className="team-profile-name">{name} </h3>
        <p className="team-profile-role">{role}</p>
        { linkedin ? <a className="website-link link-linkedin" href={linkedin} target="_blank" rel="noopener noreferrer"><IoLogoLinkedin className='company-icons'/></a> : null }
        { github ? <a className="website-link link-github" href={github} target="_blank" rel="noopener noreferrer"><IoLogoGithub className='company-icons'/></a> : null }
      </div>
    );
  };

export default ProfileCard;