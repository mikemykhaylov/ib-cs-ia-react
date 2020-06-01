import React from 'react';
import PropTypes from 'prop-types';

function FatherSon({ color, height }) {
  return (
    <svg height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M349.833 210c28.949 0 52.5-23.551 52.5-52.5v-45c0-7.026-3.013-13.704-8.099-18.391.282-6.911-2.31-13.764-7.278-18.732s-11.831-7.561-18.731-7.277c-4.688-5.086-11.366-8.1-18.392-8.1s-13.704 3.013-18.391 8.1c-6.894-.27-13.763 2.31-18.731 7.277-4.968 4.968-7.56 11.821-7.278 18.732-5.086 4.688-8.099 11.365-8.099 18.391v45c-.001 28.949 23.55 52.5 52.499 52.5zm-37.5-97.5c0-3.563 1.847-6.781 4.94-8.606a7.5 7.5 0 003.451-8.331c-.896-3.479.073-7.06 2.593-9.58s6.101-3.488 9.579-2.592a7.5 7.5 0 008.331-3.451c1.826-3.094 5.043-4.94 8.606-4.94s6.781 1.847 8.607 4.941a7.499 7.499 0 008.331 3.45c3.478-.896 7.059.072 9.579 2.592s3.489 6.101 2.593 9.58a7.5 7.5 0 003.451 8.331c3.093 1.826 4.94 5.043 4.94 8.606v8.308c-9.537-9.745-22.821-15.808-37.5-15.808s-27.963 6.063-37.5 15.807zm37.5 7.5c20.678 0 37.5 16.822 37.5 37.5s-16.822 37.5-37.5 37.5-37.5-16.822-37.5-37.5 16.822-37.5 37.5-37.5z"
        fill={color}
      />
      <path
        d="M402.333 322.5v-62.856c41.987-3.804 75-39.182 75-82.144a7.5 7.5 0 00-15 0c0 35.073-26.891 63.972-61.136 67.191C397.822 233.32 387.284 225 374.833 225h-50c-15.164 0-27.5 12.336-27.5 27.5v70c0 14.269 5.73 27.22 15 36.692v129.902l-24.872 8.291a7.501 7.501 0 002.37 14.617c.786 0 1.586-.125 2.373-.387l30-10a7.5 7.5 0 005.128-7.115V369.924c6.824 3.25 14.452 5.076 22.5 5.076s15.676-1.825 22.5-5.076V494.5a7.5 7.5 0 005.128 7.115l30 10a7.5 7.5 0 002.373.387 7.5 7.5 0 002.37-14.617l-24.872-8.291V359.192c9.272-9.472 15.002-22.423 15.002-36.692zm-77.5-82.5h50c6.893 0 12.5 5.607 12.5 12.5V315h-75v-62.5c0-6.893 5.607-12.5 12.5-12.5zm-11.746 90h73.491c-3.484 17.096-18.635 30-36.745 30s-33.262-12.904-36.746-30zM192.169 150c28.949 0 52.5-23.551 52.5-52.5v-45c0-7.025-3.013-13.704-8.1-18.392.282-6.911-2.31-13.764-7.277-18.731s-11.814-7.55-18.732-7.278C205.873 3.013 199.195 0 192.169 0s-13.704 3.013-18.391 8.099c-6.921-.272-13.764 2.31-18.732 7.278s-7.56 11.82-7.277 18.731c-5.087 4.688-8.1 11.365-8.1 18.392v45c0 28.949 23.552 52.5 52.5 52.5zm-37.5-97.5c0-3.563 1.847-6.781 4.94-8.607a7.5 7.5 0 003.45-8.33c-.896-3.479.073-7.06 2.593-9.58s6.098-3.489 9.579-2.593a7.496 7.496 0 008.331-3.45c1.826-3.094 5.043-4.94 8.607-4.94s6.781 1.847 8.606 4.94a7.499 7.499 0 008.331 3.451c3.478-.896 7.059.073 9.58 2.593 2.52 2.52 3.489 6.101 2.592 9.579a7.501 7.501 0 003.45 8.331c3.094 1.826 4.941 5.043 4.941 8.607v8.308C220.133 51.063 206.849 45 192.169 45s-27.963 6.063-37.5 15.808zm37.5 7.5c20.678 0 37.5 16.822 37.5 37.5s-16.822 37.5-37.5 37.5-37.5-16.822-37.5-37.5 16.823-37.5 37.5-37.5z"
        fill={color}
      />
      <path
        d="M254.541 497.385l-24.872-8.291V329.232a52.438 52.438 0 003.753-4.275A37.253 37.253 0 00252.169 330a7.5 7.5 0 007.5-7.5v-130c0-15.164-12.336-27.5-27.5-27.5h-80c-12.465 0-23.013 8.339-26.375 19.729-42.52-3.268-76.125-38.886-76.125-82.229a7.5 7.5 0 00-15 0c0 51.239 39.729 93.372 90 97.214V322.5a7.5 7.5 0 007.5 7.5 37.263 37.263 0 0018.747-5.043 52.607 52.607 0 003.753 4.275v159.863l-24.872 8.291a7.5 7.5 0 004.743 14.23l30-10a7.5 7.5 0 005.128-7.115V339.92c6.919 3.287 14.581 5.08 22.5 5.08s15.581-1.793 22.5-5.08V494.5a7.5 7.5 0 005.128 7.115l30 10a7.5 7.5 0 002.373.387 7.504 7.504 0 007.114-5.13 7.498 7.498 0 00-4.742-9.487zM229.669 180h2.5c6.893 0 12.5 5.607 12.5 12.5v121.215c-8.73-3.095-15-11.437-15-21.215zm-15 0v105h-45V180zm-75 12.5c0-6.893 5.607-12.5 12.5-12.5h2.5v112.5c0 9.778-6.27 18.12-15 21.215zm22.495 122.481A37.343 37.343 0 00168.915 300h46.509a37.337 37.337 0 006.751 14.981c-7.03 9.37-18.116 15.019-30.005 15.019s-22.976-5.649-30.006-15.019z"
        fill={color}
      />
    </svg>
  );
}

FatherSon.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default FatherSon;