import React from 'react';
import PropTypes from 'prop-types';

function ArrowRight({ color, height }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1121 775" height={height}>
      <path
        d="M52.082,337.15l890.225,0l-244.412,-244.421c-20.342,-20.342 -20.342,-53.317 0,-73.658c20.346,-20.338 53.321,-20.338 73.658,0l333.325,333.333c20.346,20.342 20.346,53.317 0,73.658l-333.333,333.334c-10.163,10.162 -23.5,15.254 -36.829,15.254c-13.33,0 -26.655,-5.092 -36.83,-15.254c-20.341,-20.342 -20.341,-53.317 0,-73.659l244.421,-244.42l-890.225,0c-28.762,0 -52.083,-23.325 -52.083,-52.084c0,-28.762 23.321,-52.083 52.083,-52.083Z"
        fill={color}
      />
    </svg>
  );
}

ArrowRight.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};
export default ArrowRight;
