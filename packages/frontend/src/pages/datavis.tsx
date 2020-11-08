import React, { Component } from 'react';
import './../App.css';
import '../components/Login.css';
import './datavis.css';
import { Container } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryLegend,
  VictoryLabel
} from 'victory';

export default class dataVisuals extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <h1 className="headercent">Sleep Data:</h1>

          <div className="topleft">
            <VictoryChart domain={{ y: [0, 12] }}>
              <VictoryLabel
                text="Hours Slept"
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={[
                  { x: 'Sun', y: 7 },
                  { x: 'Mon', y: 2 },
                  { x: 'Tues', y: 3 },
                  { x: 'Wed', y: 5 },
                  { x: 'Thurs', y: 4 },
                  { x: 'Fri', y: 6 },
                  { x: 'Sat', y: 6 }
                ]}
                style={{
                  data: {
                    stroke: '#02B875', // this can change line color
                    strokeWidth: 5 // width of line
                  }
                }}
              />
            </VictoryChart>
          </div>

          <div className="topright">
            <VictoryChart domain={{ y: [0, 12] }}>
              <VictoryLabel
                text="Cups of Coffee vs Hours of Sleep"
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryScatter
                data={[
                  { x: '1', y: 5 },
                  { x: '1', y: 4 },
                  { x: '1', y: 6 },
                  { x: '2', y: 3 },
                  { x: '3', y: 2 }
                ]}
                style={{
                  data: {
                    stroke: '#02B875', // this can change line color
                    strokeWidth: 5 // width of line
                  }
                }}
              />
            </VictoryChart>
          </div>

          <div className="bottomleft">
            <VictoryChart domain={{ y: [0, 12] }}>
              <VictoryLabel
                text="Dreaming vs Average Hours of Sleep"
                x={225}
                y={30}
                textAnchor="middle"
              />

              <VictoryLegend
                x={125}
                y={50}
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={{
                  border: { stroke: 'black' },
                  title: { fontSize: 10 }
                }}
                data={[
                  { name: 'Dream', symbol: { fill: '#02B875' } },
                  { name: 'No Dream', symbol: { fill: '#A5685B' } }
                ]}
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={[
                  { x: 'Sun', y: 7 },
                  { x: 'Mon', y: 2 },
                  { x: 'Tues', y: 3 },
                  { x: 'Wed', y: 5 },
                  { x: 'Thurs', y: 4 },
                  { x: 'Fri', y: 6 },
                  { x: 'Sat', y: 6 }
                ]}
                style={{
                  data: {
                    stroke: '#02B875', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />

              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={[
                  { x: 'Sun', y: 8 },
                  { x: 'Mon', y: 9 },
                  { x: 'Tues', y: 7 },
                  { x: 'Wed', y: 5 },
                  { x: 'Thurs', y: 8 },
                  { x: 'Fri', y: 10 },
                  { x: 'Sat', y: 9 }
                ]}
                style={{
                  data: {
                    stroke: '#A5685B', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />
            </VictoryChart>
          </div>

          <div className="bottomright">
            <VictoryChart domain={{ y: [0, 12] }}>
              <VictoryLabel
                text="Melatonin vs Average Hours of Sleep"
                x={225}
                y={30}
                textAnchor="middle"
              />

              <VictoryLegend
                x={125}
                y={50}
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={{
                  border: { stroke: 'black' },
                  title: { fontSize: 10 }
                }}
                data={[
                  { name: 'Melatonin', symbol: { fill: '#02B875' } },
                  { name: 'No Melatonin', symbol: { fill: '#A5685B' } }
                ]}
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={[
                  { x: 'Sun', y: 10 },
                  { x: 'Mon', y: 8 },
                  { x: 'Tues', y: 6 },
                  { x: 'Wed', y: 8 },
                  { x: 'Thurs', y: 7 },
                  { x: 'Fri', y: 7 },
                  { x: 'Sat', y: 6 }
                ]}
                style={{
                  data: {
                    stroke: '#02B875', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />

              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={[
                  { x: 'Sun', y: 7 },
                  { x: 'Mon', y: 2 },
                  { x: 'Tues', y: 3 },
                  { x: 'Wed', y: 5 },
                  { x: 'Thurs', y: 4 },
                  { x: 'Fri', y: 6 },
                  { x: 'Sat', y: 6 }
                ]}
                style={{
                  data: {
                    stroke: '#A5685B', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />
            </VictoryChart>
          </div>
        </Container>
      </Layout>
    );
  }
}
