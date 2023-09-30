import { useState } from 'react';
import './Filter.css';

function Filter({ 
  
  initialLabel = 'Select', 
  initialOption = null, 
  options = [], 
  renderOption = (option) => option, 
  onSelect 
}) {
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelection = (value) => {
    setSelectedOption(value);
    setShowDropdown(false);
    if (onSelect) onSelect(value);
  };

  return (
    <div className="filter-container">
      <div className="dropdown">
        <button 
          onClick={() => setShowDropdown(!showDropdown)} 
          className="dropdown-button"
        >
          {selectedOption ? renderOption(selectedOption) : initialLabel}
          <span className="arrow">▼</span>
        </button>
        <div className="dropdown-content" style={{ display: showDropdown ? 'block' : 'none' }}>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleSelection(option)}>
              {renderOption(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;