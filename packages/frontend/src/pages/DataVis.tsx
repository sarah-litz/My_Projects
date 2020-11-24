import React from 'react';
import '../components/Login.css';
import './DataVis.css';
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { useGetSleepDataQuery } from '../generated/types-and-hooks';
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryLegend,
  VictoryLabel
} from 'victory';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Visualization: React.FC = () => {
  const { data } = useGetSleepDataQuery();

  if (!data) {
    return (
      <Layout>
        <Jumbotron>
          <h1>Uh Oh!</h1>
          <p>
            Unfortunately we couldn't find any existing data. You must manually
            input data into our datalog here:
          </p>
          <Link to="/logdata">
            <Button variant="primary">Start logging your sleep!</Button>
          </Link>
        </Jumbotron>
      </Layout>
    );
  }
  const sleepData = data.sleepData;

  const currentTime = moment();
  const pastWeek = sleepData.filter(
    (day) => currentTime.diff(moment(day.date), 'day') < 7
  );
  pastWeek.sort((a, b) => moment(a.date).diff(moment(b.date)));

  const result = pastWeek.map((day) => ({
    x: moment(day.date).format('ddd'),
    y: day.totalHours ?? 0
  }));

  // Compares caffeine to hours slept
  const caffeineSleep = sleepData.map((val) => ({
    x: val.caffeine ?? 0,
    y: val.totalHours ?? 0
  }));

  const anxiety = sleepData.map((val) => ({
    x: val.anxiety ?? 0,
    y: val.totalHours ?? 0
  }));

  // Measure sleep quality
  const sleepQuality = sleepData.map((val) => ({
    x: val.sleepQuality ?? 0,
    y: val.totalHours ?? 0
  }));

  // would like to incorporate the average hours slept if two different values for hours slept fall on the
  // same weekday, right now the graph is buggy if they store two vals for the same weekday but on different dates:

  // for comparing dreaming to hours slept
  const dreamSleep = sleepData
    .filter((dream) => dream.didDream === true)
    .map((dreamStatus) => ({
      x: moment(dreamStatus.date).format('ddd'),
      y: dreamStatus.totalHours ?? 0
    }));

  const noDreamSleep = sleepData
    .filter((dream) => dream.didDream === false)
    .map((noDreamStatus) => ({
      x: moment(noDreamStatus.date).format('ddd'),
      y: noDreamStatus.totalHours ?? 0
    }));

  const melatonin = sleepData.map((val) => ({
    x: val.melatonin ?? 0,
    y: val.totalHours ?? 0
  }));

  return (
    <Layout>
      <h1>Sleep Data:</h1>

      <Container>
        <Row>
          <Col>
            <VictoryChart>
              <VictoryLabel
                text="Hours Slept"
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={result}
                style={{
                  data: {
                    stroke: '#02B875', // this can change line color
                    strokeWidth: 5 // width of line
                  }
                }}
              />
            </VictoryChart>
          </Col>
          <Col>
            <VictoryChart>
              <VictoryLabel
                text="Sleep Quality vs Average Hours of Sleep"
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
                  { name: 'Good sleep quality', symbol: { fill: '#02B875' } },
                  { name: 'Poor sleep quality', symbol: { fill: '#A5685B' } }
                ]}
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={sleepQuality}
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
                data={sleepQuality}
                style={{
                  data: {
                    stroke: '#A5685B', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />
            </VictoryChart>
          </Col>
        </Row>
        <Row>
          <Col>
            <VictoryChart>
              <VictoryLabel
                text="Cups of Coffee vs Hours of Sleep"
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryScatter
                data={caffeineSleep}
                style={{
                  data: {
                    stroke: '#02B875', // this can change line color
                    strokeWidth: 5 // width of line
                  }
                }}
              />
            </VictoryChart>
          </Col>
          <Col>
            <VictoryChart>
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
                data={dreamSleep}
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
                data={noDreamSleep}
                style={{
                  data: {
                    stroke: '#A5685B', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />
            </VictoryChart>
          </Col>
        </Row>

        <Row>
          <Col>
            <VictoryChart>
              <VictoryLabel
                text="Anxiety vs Average Hours of Sleep"
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
                  { name: 'Low anxiety', symbol: { fill: '#02B875' } },
                  { name: 'High anxiety', symbol: { fill: '#A5685B' } }
                ]}
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={anxiety}
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
                data={anxiety}
                style={{
                  data: {
                    stroke: '#A5685B', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />
            </VictoryChart>
          </Col>
          <Col>
            <VictoryChart>
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
                  { name: 'Longer sleep', symbol: { fill: '#02B875' } },
                  { name: 'Shorter sleep', symbol: { fill: '#A5685B' } }
                ]}
              />
              <VictoryLine
                interpolation="natural" // can make the plot smooth
                labels={({ datum }) => datum.y} //label points
                data={melatonin}
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
                data={melatonin}
                style={{
                  data: {
                    stroke: '#A5685B', // this can change line color
                    strokeWidth: 1 // width of line
                  }
                }}
              />
            </VictoryChart>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Visualization;
