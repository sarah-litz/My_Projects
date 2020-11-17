import React, { FormEvent } from 'react';
// import useState from React too later
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
  qFive: 'Rate your stress.',
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

const selectData = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

class SettingsCard extends React.Component<{
  toggle?: boolean;
  qOne?: string;
  qTwo?: string;
  qThree?: string;
  qFour?: string;
  qFive?: string;
  prompt?: string;
}> {
  render() {
    return (
      <Container>
        <p className="h2">{this.props.prompt}</p>
        <div className="container">
          <Form onSubmit={selectData}>
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
            <SleepMetrics toggle={this.props.toggle}>
              {this.props.qFive}
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
