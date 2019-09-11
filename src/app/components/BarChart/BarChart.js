import React from 'react';
import * as PropTypes from 'prop-types';
import { HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';

import './BarChart.scss';

const axisStyles = {
  line: { stroke: '#ADDDE1' },
  ticks: { stroke: '#ADDDE1' },
  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
};

const BarChart = () => {
  return (
    <XYPlot margin={{ bottom: 70 }} xType="ordinal" width={500} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-45} style={axisStyles} />
      <YAxis style={axisStyles} />
      <VerticalBarSeries
        data={[
          { x: '-10 - 0', y: 10 },
          { x: '0 - 10', y: 5 },
          { x: '10 - 20', y: 2 }
        ]}
      />
    </XYPlot>
  );
};

BarChart.propTypes = {
  value: PropTypes.number,
  timestamp: PropTypes.number
};

export default BarChart;

