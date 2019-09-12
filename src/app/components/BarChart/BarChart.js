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
  const sortRanges = values => values.sort((a,b) => a.x > b.x ? 1 : b.x > a.x ? -1 : 0);

  return (
    <div className="bar-chart">
      <XYPlot margin={{ bottom: 70, left: 100, right: 50, top: 50 }} xType="ordinal" width={800} height={400}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} style={axisStyles} title="Range" />
        <YAxis style={axisStyles} title="Amount" />
        <VerticalBarSeries
          data={data && data.length ?
            sortRanges(data).map(e => ({ x: e.x.join(' - '), y: e.y }))
            : [{ x: '0', y: 0 }]}
        />
      </XYPlot>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array
};

export default BarChart;

