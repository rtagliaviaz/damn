import React from "react";
import PropTypes from "prop-types";

const Progress = ({ percentage }) => {
  if (percentage > 0) {
    return (
    
      <div className='progress'>
        <div
          className='progress-bar progress-bar-striped bg-success'
          role='progressbar'
          style={{ width: `${percentage}%` }}
        >
          {/* making it dinamic */}
          {percentage}%
        </div>
        
      </div>
    );
  } else {
    return (
    
      <div className='progress'>
        <div
          className=''
          role='progressbar'
          style={{ width: `${percentage}` }}
        >
         
        </div>
        
      </div>
    );
  }
  
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
