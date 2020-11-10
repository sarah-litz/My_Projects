import React from 'react';
import './../App.css';
import '../components/Login.css';
import './datavis.css';
import { Container } from 'react-bootstrap';
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

//export default class dataVisuals extends Component {
const Visualization: React.FC = () => {
  const { data } = useGetSleepDataQuery();

  if (!data) {
    return <p>no data</p>;
  }
  const sleepData = data.sleepData;

  // console.log(sleepData);

  const currentTime = moment();
  const pastWeek = sleepData.filter(
    (day) => currentTime.diff(moment(day.date), 'day') < 7
  );
  pastWeek.sort((a, b) => moment(a.date).diff(moment(b.date)));

  // console.log(pastWeek);

  // console.log(sleepData.map(day => currentTime.diff(moment(day.date), 'day')))

  const result = pastWeek.map((day) => ({
    x: moment(day.date).format('ddd'),
    y: day.totalHours ?? 0
  }));
  
  // for comparing caffeine to hours slept
  const caffeineSleep = sleepData.map((val) => ({
    x: val.caffeine ?? 0,
    y: val.totalHours ?? 0
  }));

  // TODO: needs more visualization changes below
  const sleepQuality = sleepData.map((val) => ({
    x: val.sleepQuality ?? 0,
    y: val.totalHours ?? 0
  }));

  // would like to incorporate the average hours slept if two different values for hours slept fall on the 
  // same weekday, right now the graph is buggy if they store two vals for the same weekday but on different dates:
  
  // for comparing dreaming to hours slept
  const dreamSleep = sleepData.filter(dream => dream.didDream === true).map((dreamStatus => ({
    x: moment(dreamStatus.date).format('ddd'),
    y: dreamStatus.totalHours ?? 0
  })))

  const noDreamSleep = sleepData.filter(dream => dream.didDream === false).map((noDreamStatus => ({
    x: moment(noDreamStatus.date).format('ddd'),
    y: noDreamStatus.totalHours ?? 0
  })))

  /* NOTE: We may want to return to this later so I'm just going to leave it here */
  // for comparing feeling rested to hours slept
  /*const restedSleep = sleepData.filter(rested => rested.feltRested === true).map((restedStatus => ({
    x: moment(restedStatus.date).format('ddd'),
    y: restedStatus.totalHours ?? 0
  })))

  const notRestedSleep = sleepData.filter(notRested => notRested.feltRested === false).map((notRestedStatus => ({
    x: moment(notRestedStatus.date).format('ddd'),
    y: notRestedStatus.totalHours ?? 0
  })))*/

/*
  // can be implemented once we incorporate utilizing melatonin into sleep data

  const melatoninSleep = sleepData.filter(melatonin => melatonin.didMelatonin === true).map((melatoninStatus => ({
    x: moment(melatoninStatus.date).format('ddd'),
    y: melatoninStatus.totalHours ?? 0
  })))

  const noMelatoninSleep = sleepData.filter(noMelatonin => noMelatonin.didMelatonin === false).map((noMelatoninStatus => ({
    x: moment(noMelatoninStatus.date).format('ddd'),
    y: noMelatoninStatus.totalHours ?? 0
  })))

*/
  //render() {
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
              data={result}
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
              data={caffeineSleep}
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
        </div>
      </Container>
    </Layout>
  );
};

export default Visualization;
