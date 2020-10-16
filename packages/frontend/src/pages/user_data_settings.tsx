import React from 'react';
import './../App.css';
import { Container, Form, Button, FormGroup } from 'react-bootstrap';
import { Layout } from '../components/Layout';

var AlwaysAsk = {
  prompt: "We'll always try to track a couple of items:",
  qOne: 'Hours of sleep in a night',
  qTwo: 'How well did you sleep last night?'
};

var SometimesAsk = {
  prompt: "Here are the other metrics you've opted into:",
  qOne: 'Caffeine intake during the day',
  qTwo: 'What time did you go to sleep last night?',
  qThree: 'Did you have dreams?',
  qFour: 'Did you take melatonin?',
  toggle: true
};

// const keys = Object.keys(SometimesAsk);
// const items : any[]=[];
// for (let key of keys){
//     items.push(
//       <FormGroup>
//           <p>{key}</p>
//           {/* {this.props.toggle && <button>Stop Tracking</button>} */}
//       </FormGroup>
//     )
// }

export const UserDataSettings: React.FC<{
  prompt?: string;
}> = () => {
  return (
    <Layout>
      <div className="container">
        <h1>My Habits</h1>
        <p className="lead">Here are the metrics you're currently tracking:</p>
        <SettingsCard {...AlwaysAsk}></SettingsCard>
        <SettingsCard {...SometimesAsk}></SettingsCard>
        <p>
          <Button variant="primary">Add Metrics</Button>
        </p>
      </div>
    </Layout>
  );
};

class SettingsCard extends React.Component<{
  toggle?: boolean;
  qOne?: string;
  qTwo?: string;
  qThree?: string;
  qFour?: string;
  prompt?: string;
}> {
  render() {
    return (
      <Container>
        <p className="h2">{this.props.prompt}</p>
        <div className="container">
          <Form>
            <SleepMetrics toggle={this.props.toggle}>
              {this.props.qOne}
            </SleepMetrics>
            <SleepMetrics toggle={this.props.toggle}>
              {this.props.qTwo}
            </SleepMetrics>
            <SleepMetrics toggle={this.props.toggle}>
              {this.props.qThree}
            </SleepMetrics>
            <SleepMetrics toggle={this.props.toggle}>
              {this.props.qFour}
            </SleepMetrics>
          </Form>
        </div>
      </Container>
    );
  }
}

class SleepMetrics extends React.Component<{
  toggle?: boolean;
  qOne?: string;
}> {
  render() {
    return (
      <Container>
        <FormGroup>
          <p>{this.props.children}</p>
          {this.props.toggle && <button>Stop Tracking</button>}
        </FormGroup>
      </Container>
    );
  }
}
