import { useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import './Accordion.css'

const Accordion = ({ sections, className  }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className={`accordion ${className}`}>
      {sections.map(({ label, content }, index) => (
        <div className="accordion-item" key={index}>
          <button className="accordion-button" onClick={() => toggleSection(label)}>
            {openSection === label ? <GoChevronDown className='accordion-chevron'/> : <GoChevronRight className='accordion-chevron' />} {label}
          </button>
          <div className={`accordion-content ${openSection === label ? 'open' : ''}`}>
            {Array.isArray(content) ? content.map((item, i) => <p key={i}>{item}</p>) : <p>{content}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};


export default Accordion;