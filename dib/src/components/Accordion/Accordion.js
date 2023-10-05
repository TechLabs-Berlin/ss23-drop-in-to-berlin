import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

const Accordion = ({ sections }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className="accordion">
      {sections.map(({ label, content }, index) => (
        <div className="accordion-item" key={index}>
          <button className="accordion-button" onClick={() => toggleSection(label)}>
            { openSection === label ? <GoChevronLeft /> : <GoChevronDown /> } {label}
          </button>
          <div className={`accordion-content ${openSection === label ? 'open' : ''}`}>
            <p>{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;