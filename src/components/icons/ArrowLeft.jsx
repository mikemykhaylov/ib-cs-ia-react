import PropTypes from 'prop-types';

function ArrowRight({ color, height }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1121 775" height={height}>
      <path
        d="M1068.05,337.15l-890.225,0l244.413,-244.421c20.341,-20.342 20.341,-53.317 0,-73.658c-20.346,-20.338 -53.321,-20.338 -73.659,0l-333.325,333.333c-20.346,20.342 -20.346,53.317 0,73.658l333.334,333.334c10.162,10.162 23.5,15.254 36.829,15.254c13.329,0 26.654,-5.092 36.829,-15.254c20.342,-20.342 20.342,-53.317 0,-73.659l-244.421,-244.42l890.225,0c28.763,0 52.083,-23.325 52.083,-52.084c0.001,-28.762 -23.32,-52.083 -52.083,-52.083Z"
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
