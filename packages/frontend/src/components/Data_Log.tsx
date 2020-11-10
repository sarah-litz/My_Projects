import React, { FormEvent, useState } from 'react';
import './Login.css';
import './../App.css';
import { Layout } from '../components/Layout';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { useGetSleepDataQuery } from '../generated/types-and-hooks';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserData: React.FC = () => {
  const { data } = useGetSleepDataQuery();

  const [sleepHours, setSleep] = useState('');
  const [feltRested, setFeltRested] = useState('');
  const [didDream, setDidDream] = useState('');
  const [caffeine, setCaffeine] = useState('');
  const [anxiety, setAnxiety] = useState('');
  // const [startDate, setStartDate] = useState(new Date());
  const [date, setLogDate] = useState('');

  const collectData = async (event: FormEvent<HTMLFormElement>) => {
    // alert('Your data was recorded.');
    event.preventDefault(); //not sure what this does-- cpy paste from Login.tsx
  };

  //follow login in Login.tsx
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
                value={feltRested}
                slideStop={(event) => setFeltRested(event.target.value)}
              ></ReactBootstrapSlider>
            </div>
            <br></br>
            <div className="form-group text-center">
              <p>
                <b>Did you dream?</b>
              </p>
              {/* TODO: is this right?? will this actually set "didDream" */}
              <Test onOptionSelect={(didDream) => setDidDream(didDream)}>
                <QuestionGroup>
                  <Option value="0">No Dreams</Option>
                  <Option value="1">Unsure</Option>
                  <Option value="2">Yes, a little</Option>
                  <Option value="3">Yes, a lot</Option>
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

// class Slider extends React.Component<{
//     currentValue?: number;
//     qOne?: string;
//   }>{
//     render() {}
//         return (<ReactBootstrapSlider
//             value={this.state.currentValue}
//             change={this.changeValue}
//             slideStop={this.changeValue}
//             step={this.state.step}
//             max={this.state.max}
//             min={this.state.min}
//             orientation="vertical"
//             reversed={true}
//             disabled="disabled" />
//     );
// }
// }
