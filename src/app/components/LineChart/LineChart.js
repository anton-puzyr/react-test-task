import React from 'react';
import * as PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

import './LineChart.scss';

const LineChart = ({ data }) => {
  return (
    <div>
      <XYPlot
        xType="time"
        width={800}
        height={500}
      >
        <HorizontalGridLines />
        <LineSeries data={data} />
        <XAxis title="Time" />
        <YAxis title="Value" />
      </XYPlot>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array
};

export default LineChart;

