const ProfileCard = ({ name, role, image, website, websiteLabel }) => {
    return (
      <div className="profile-card">
        <img src={image} alt={`${name}'s profile`} />
        <h3>{name}</h3>
        <p>{role}</p>
        { website && <a className="website-link" href={website} target="_blank" rel="noopener noreferrer">{websiteLabel || 'Website'}</a> }
      </div>
    );
  };

export default ProfileCard;