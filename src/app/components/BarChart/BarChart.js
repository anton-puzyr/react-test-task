import React from 'react';
import * as PropTypes from 'prop-types';

import './BarChart.scss';

const BarChart = () => {
  return (
    <div>
        Bar
    </div>
  );
};

BarChart.propTypes = {
  value: PropTypes.number,
  timestamp: PropTypes.number
};

export default BarChart;

