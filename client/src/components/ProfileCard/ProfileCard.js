const ProfileCard = ({ name, role, image, website, websiteLabel }) => {
    return (
      <div className="profile-card">
        <img src={image} alt={`${name}'s profile`} className="team-profile-img" />
        <h3 className="team-profile-name">{name} </h3>
        <p className="team-profile-role">{role}</p>
        { website && <a className="website-link" href={website} target="_blank" rel="noopener noreferrer">{websiteLabel || 'Website'}</a> }
      </div>
    );
  };

export default ProfileCard;