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
  const initialDate = () => {
    const dt = new Date();
    return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
  };

  const limitTickValues = coordinates => coordinates.length > 15
    ? coordinates
      .filter((item, idx) => {
        if (idx % Math.floor(coordinates.length / 15) === 0) {
          return item.x;
        }
      }).map(item => item.x)
    : coordinates.map(item => item.x);

  return (
    <div>
      <XYPlot
        xType="ordinal"
        width={800}
        height={400}
        margin={{ bottom: 100, left: 100, right: 50, top: 50 }}
      >
        <HorizontalGridLines />
        <LineSeries data={data && data.length ? data : [{ x: initialDate(), y: 0 }]} />
        <XAxis
          title="Time"
          tickLabelAngle={-45}
          style={axisStyles}
          tickValues={limitTickValues(data)}
        />
        <YAxis title="Value" style={axisStyles} />
      </XYPlot>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array
};

export default LineChart;

