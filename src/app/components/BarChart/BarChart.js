import React from 'react';
import * as PropTypes from 'prop-types';
import { HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';

import './BarChart.scss';

const axisStyles = {
  line: { stroke: '#ADDDE1' },
  ticks: { stroke: '#ADDDE1' },
  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
};

const BarChart = ({ data }) => {
  return (
    <XYPlot margin={{ bottom: 70 }} xType="ordinal" width={500} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-45} style={axisStyles} />
      <YAxis style={axisStyles} />
      <VerticalBarSeries data={data} />
    </XYPlot>
  );
};

BarChart.propTypes = {
  data: PropTypes.array
};

export default BarChart;

