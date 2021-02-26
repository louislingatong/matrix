import React from 'react';
import PropTypes from 'prop-types';

Loader.propTypes = {
  type: PropTypes.oneOf(['circular', 'linear']),
};

function Loader(props) {
  return (
    <div className="loader-wrapper">
      <div className={`loading ${props.type}`}/>
    </div>
  );
}

export default Loader;