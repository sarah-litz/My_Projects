import React, { FormEvent, useState } from 'react';
import './../App.css';
import { Container, Form, FormGroup } from 'react-bootstrap';
import { Layout } from '../components/Layout';

var SometimesAsk = {
  prompt: "Here are the other metrics you've opted into:",
  qOne: 'Caffeine intake during the day',
  qTwo: 'What time did you go to sleep last night?',
  qThree: 'Did you have dreams?',
  qFour: 'Did you take melatonin?',
  qFive: 'Rate your stress.',
  toggle: true
};

const UserDataSettings:  React.FC = () =>{

const [trackCaffeine, setTrackCaffeine] = useState('');
const [trackBedtime, setTrackBedtime] = useState('');
const [trackDreams, setTrackDreams] = useState('');
const [trackMelatonin, setTrackMelatonin] = useState('');

const selectData = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); 
};
return (
  <Layout>
    <div className="register mycard card col-12 col-lg-4 login-card hv-center">
    <div className="container">
      <h1>My Habits</h1>
      <p className="lead">Here are the metrics you're currently tracking:</p>
      <Container>
        <p className="h2">We'll always try to track a couple of items:</p>
          <div className="form-group text-center">
            <p>
              <b>Hours of sleep in a night</b>
            </p>
          </div>
          <div className="form-group text-center">
            <p>
              <b>How well did you sleep last night?</b>
            </p>
          </div>
      </Container>
      <Container>
        <p className="lead">Here are the other metrics you've opted into:</p>
          <Form onSubmit={selectData}>
          <div className="form-group text-center">
            <p>
              <b>Caffeine intake during the day</b>
            </p>
            <div className='custom-control custom-switch'>
              <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitches'
                value = {trackCaffeine}
                onChange={(event)=> setTrackCaffeine(event.target.value)}
              />
              <label className='custom-control-label' htmlFor='customSwitches'>
                Track this metric
              </label>
            </div>
          </div>
          <button
              className="button btn btn-md btn-primary"
              type="submit"
              value="Submit"
            >
              Store Settings
            </button>
          </Form>
      </Container>
    </div>
    </div>
  </Layout>
);
};
export default UserDataSettings; 
