import React from 'react';
import PropTypes from 'prop-types';

function Time({ color, height }) {
  return (
    <svg viewBox="0 0 512.002 512.002" height={height} xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          d="m256.001 0c-141.159 0-256.001 114.842-256.001 256.001s114.842 256.001 256.001 256.001 256.001-114.842 256.001-256.001-114.842-256.001-256.001-256.001zm0 492.002c-130.131 0-236.001-105.87-236.001-236.001s105.87-236.001 236.001-236.001 236.001 105.87 236.001 236.001-105.87 236.001-236.001 236.001z"
          fill={color}
        />
        <path
          d="m256.001 60c-108.075 0-196.001 87.926-196.001 196.001s87.926 196.001 196.001 196.001 196.001-87.926 196.001-196.001-87.926-196.001-196.001-196.001zm10 371.712v-19.709c0-5.523-4.477-10-10-10s-10 4.477-10 10v19.709c-89.101-5.016-160.695-76.61-165.711-165.711h19.71c5.523 0 10-4.477 10-10s-4.477-10-10-10h-19.71c5.016-89.101 76.61-160.694 165.711-165.71v19.709c0 5.523 4.477 10 10 10s10-4.477 10-10v-19.709c89.101 5.016 160.695 76.609 165.711 165.71h-19.71c-5.523 0-10 4.477-10 10s4.477 10 10 10h19.71c-5.016 89.101-76.61 160.695-165.711 165.711z"
          fill={color}
        />
        <path
          d="m169.195 125.641c1.806 3.354 5.25 5.258 8.81 5.258 1.601 0 3.226-.386 4.734-1.198 4.863-2.619 6.681-8.687 4.062-13.549-2.618-4.862-8.682-6.681-13.546-4.063-4.862 2.618-6.682 8.683-4.063 13.546z"
          fill={color}
        />
        <path
          d="m116.152 186.802.006.003c1.508.812 3.13 1.197 4.73 1.197 3.56 0 7.006-1.907 8.813-5.262 2.618-4.863.796-10.929-4.067-13.547-4.862-2.617-10.927-.799-13.546 4.063-2.618 4.863-.798 10.928 4.064 13.546z"
          fill={color}
        />
        <path
          d="m116.152 325.201c-4.862 2.618-6.682 8.683-4.063 13.546 1.806 3.354 5.253 5.261 8.813 5.261 1.601 0 3.224-.385 4.732-1.197l.006-.003c4.862-2.618 6.679-8.681 4.061-13.544-2.617-4.864-8.685-6.681-13.549-4.063z"
          fill={color}
        />
        <path
          d="m182.739 382.301c-4.862-2.618-10.929-.795-13.547 4.067-2.619 4.863-.799 10.928 4.063 13.546 1.508.812 3.131 1.197 4.732 1.197 3.56 0 7.007-1.907 8.813-5.261l.003-.006c2.62-4.863.799-10.925-4.064-13.543z"
          fill={color}
        />
        <path
          d="m342.518 385.861c-2.895-4.704-9.051-6.167-13.756-3.272-4.704 2.895-6.168 9.058-3.273 13.761 1.889 3.069 5.168 4.76 8.526 4.76 1.788 0 3.598-.479 5.232-1.485 4.704-2.895 6.17-9.054 3.275-13.758z"
          fill={color}
        />
        <path
          d="m395.85 325.201-.006-.003c-4.862-2.618-10.924-.797-13.543 4.065-2.618 4.863-.796 10.929 4.067 13.547 1.508.812 3.131 1.197 4.732 1.197 3.56 0 7.007-1.907 8.813-5.261 2.619-4.862.799-10.927-4.063-13.545z"
          fill={color}
        />
        <path
          d="m386.367 169.192-.006.003c-4.862 2.618-6.679 8.681-4.061 13.544 1.806 3.354 5.253 5.26 8.815 5.26 1.601 0 3.226-.386 4.734-1.198 4.862-2.618 6.682-8.683 4.063-13.546-2.617-4.861-8.681-6.68-13.545-4.063z"
          fill={color}
        />
        <path
          d="m339.247 112.377c-4.705-2.895-10.863-1.428-13.758 3.275l-.004.006c-2.895 4.704-1.426 10.86 3.277 13.755 1.634 1.005 3.442 1.484 5.229 1.484 3.359 0 6.641-1.693 8.53-4.763 2.896-4.703 1.429-10.863-3.274-13.757z"
          fill={color}
        />
        <path
          d="m273.306 265.974c1.704-2.941 2.696-6.341 2.696-9.973 0-7.373-4.035-13.82-10-17.288v-98.711c0-5.523-4.477-10-10-10s-10 4.477-10 10v98.711c-5.965 3.468-10 9.915-10 17.288 0 11.016 8.984 20 20 20l34.339 59.477c1.852 3.208 5.213 5.001 8.669 5.001 1.696 0 3.416-.432 4.991-1.341 4.783-2.761 6.422-8.877 3.66-13.66z"
          fill={color}
        />
      </g>
    </svg>
  );
}

Time.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default Time;