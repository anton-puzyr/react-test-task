import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

import './LineChart.scss';

class LineChart extends Component {
    state = {
      coordinates: []
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.data !== this.props.data) {
        const { data: { value, timestamp } } = this.props;

        const y = this.sanitizeData(value);
        const x = this.timestampToDate(timestamp);
        const coordinates = Object.assign({}, { x, y });

        this.setState({
          coordinates: [...prevState.coordinates, coordinates]
        });
      }
    }

    sanitizeData = value => Math.round(value);

    timestampToDate = date => new Date(date);

    render() {
      const { coordinates } = this.state;
      console.log(this.state.coordinates);
      return (
        <div>
          <XYPlot
            xType="time"
            width={800}
            height={500}
          >
            <HorizontalGridLines />
            <LineSeries data={coordinates} />
            <XAxis title="Time" />
            <YAxis title="Value" />
          </XYPlot>
        </div>
      );
    }
}

LineChart.propTypes = {
  data: PropTypes.object
};

export default LineChart;

