import React from 'react';
import * as PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

import './LineChart.scss';

const axisStyles = {
  line: { stroke: '#ADDDE1' },
  ticks: { stroke: '#ADDDE1' },
  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
};

const LineChart = ({ data }) => {
  return (
    <div>
      <XYPlot
        xType="time"
        width={800}
        height={500}
        margin={{ bottom: 70 }}
      >
        <HorizontalGridLines />
        <LineSeries data={data} />
        <XAxis title="Time" tickLabelAngle={-45} style={axisStyles} />
        <YAxis title="Value" style={axisStyles} />
      </XYPlot>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array
};

export default LineChart;

