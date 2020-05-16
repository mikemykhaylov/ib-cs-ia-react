import React from 'react';
import PropTypes from 'prop-types';

function Logo({ color, height }) {
  return (
    <svg
      height={height}
      viewBox="0 0 1553 343"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2,
      }}
    >
      <g transform="matrix(1,0,0,1,-464,-638)">
        <g transform="matrix(4.16667,0,0,4.16667,0,0)">
          <g id="Logo">
            <g transform="matrix(1,0,0,1,243.476,193.048)">
              <path
                d="M0,0.018L9.33,-5.442L9.33,-29.126L-132.085,-29.126L-117.426,-17.655L-2.141,-17.655L-2.141,-5.726L-102.18,-5.726L-87.521,5.745L-2.141,5.745L-2.141,17.674L-72.274,17.674L-57.615,29.144L8.314,29.144L8.314,29.098L9.33,29.098L9.33,5.454L0,0.018Z"
                fill={color}
              />
            </g>
            <g transform="matrix(1,0,0,1,351.8,193.048)">
              <path
                d="M0,0.018L-9.33,-5.442L-9.33,-29.126L132.086,-29.126L117.426,-17.655L2.141,-17.655L2.141,-5.726L102.18,-5.726L87.521,5.745L2.141,5.745L2.141,17.674L72.274,17.674L57.615,29.144L-8.314,29.144L-8.314,29.098L-9.33,29.098L-9.33,5.455L0,0.018Z"
                fill={color}
              />
            </g>
            <g transform="matrix(0.24,0,0,0.24,0,0)">
              <path
                d="M1236.6,637.997C1330.98,637.997 1407.61,714.625 1407.61,809.01C1407.61,903.394 1330.98,980.022 1236.6,980.022C1142.21,980.022 1065.58,903.394 1065.58,809.01C1065.58,714.625 1142.21,637.997 1236.6,637.997ZM1236.6,701.268C1296.06,701.268 1344.34,749.546 1344.34,809.012C1344.34,868.477 1296.06,916.755 1236.6,916.755C1177.13,916.755 1128.85,868.477 1128.85,809.012C1128.85,749.546 1177.13,701.268 1236.6,701.268Z"
                fill={color}
              />
            </g>
            <g transform="matrix(0.24,0,0,0.24,0,0)">
              <circle cx="1236.6" cy="809.007" r="55.702" fill={color} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

Logo.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default Logo;
