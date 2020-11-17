import React, { FormEvent, useState } from 'react';
import './Login.css';
import './../App.css';
import { Layout } from './Layout';
import ReactBootstrapSlider from 'react-bootstrap-slider';
// import { useGetSleepDataQuery } from '../generated/types-and-hooks';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';
import { Test, QuestionGroup, Option } from 'react-multiple-choice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserData: React.FC = () => {
  // const { data } = useGetSleepDataQuery();

  const [sleepHours, setSleep] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [didDream, setDidDream] = useState('');
  const [caffeine, setCaffeine] = useState('');
  const [anxiety, setAnxiety] = useState('');
  const [melatonin, setMelatonin] = useState('');
  const [date, setLogDate] = useState('');

  const collectData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //not sure what this does-- cpy paste from Login.tsx
  };

  return (
    <Layout>
      <div className="register mycard card col-12 col-lg-4 login-card hv-center">
        <div className="container">
          <h1>My Habits</h1>
          <form onSubmit={collectData}>
            <p className="lead">Tell us about your day.</p>
            <div className="form-group text-center">
              <p>
                <b>What was the date?</b>
              </p>
              <DatePicker
                selected={date}
                onSelect={(date) => setLogDate(date)}
              />
            </div>
            <div className="form-group text-center">
              <p>
                <b>How many hours did you sleep that night?</b>
              </p>
              <ReactBootstrapSlider
                min="0"
                max="14"
                value={sleepHours}
                slideStop={(event) => setSleep(event.target.value)}
              ></ReactBootstrapSlider>
            </div>
            <br></br>
            <div className="form-group text-center">
              <p>
                <b>How well did you sleep that night?</b>
              </p>
              <p>0 = terribly. 10 = like a baby.</p>
              <ReactBootstrapSlider
                min="0"
                max="10"
                value={sleepQuality}
                slideStop={(event) => setSleepQuality(event.target.value)}
              ></ReactBootstrapSlider>
            </div>
            <br></br>
            <div className="form-group text-center">
              <p>
                <b>Did you dream?</b>
              </p>
              {/* TODO: is this right?? will this actually set "didDream" */}
              <Test value={didDream} onOptionSelect={didDream => setDidDream(didDream)}>
              {/* <Test onOptionSelect={(event) => setDidDream(event.target.value)}> */}
              {/* <Test value={didDream} onOptionSelect={(event) => setDidDream(event.target.value)}> */}
                <QuestionGroup>
                  <Option value="0">No Dreams</Option>
                  <Option value="1">Yes</Option>
                </QuestionGroup>
              </Test>
            </div>
            <br></br>
            <div className="form-group text-center">
              <p>
                <b>What was your caffeine intake during the day</b>
              </p>
              <p>Units are cups of coffee (1 cup = ~85mg)</p>
              <ReactBootstrapSlider
                min="0"
                max="12"
                value={caffeine}
                slideStop={(event) => setCaffeine(event.target.value)}
              ></ReactBootstrapSlider>
            </div>
            <br></br>
            <div className="form-group text-center">
              <p>
                <b>How much stress did you experience?</b>
              </p>
              <p>
                0 = too blessed to be stressed. 10 = currently being chased by a
                bear.
              </p>
              <ReactBootstrapSlider
                min="0"
                max="12"
                value={anxiety}
                slideStop={(event) => setAnxiety(event.target.value)}
              ></ReactBootstrapSlider>
            </div>
            <div className="form-group text-center">
              <p>
                <b>How much melatonin did you take?</b>
              </p>
              <p>Units are milligrams.</p>
              <ReactBootstrapSlider
                min="0.1"
                max="12.0"
                value={melatonin}
                slideStop={(event) => setMelatonin(event.target.value)}
              ></ReactBootstrapSlider>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <button
                className="button btn btn-md btn-primary"
                type="submit"
                value="Submit"
              >
                Log Data
              </button>
              <br></br>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserData;
