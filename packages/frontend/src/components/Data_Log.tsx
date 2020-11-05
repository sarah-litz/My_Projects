import React, { FormEvent, useState } from 'react';
import { Container, Form, Button, FormGroup, Submit } from 'react-bootstrap';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
//import { useLoginMutation } from '../generated/types-and-hooks';
import { token } from '../store/cache';
import { Layout } from '../components/Layout';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { render } from '@testing-library/react';

//const [email, setEmail] = useState('');

function getUserData() {
  const [getData] = useGetDataMutation();

  const [caffeine, setCaffeine] = useState('');
  const [sleepHours, setSleep] = useState('');

  const collectData = async (event: FormEvent<HTMLFormElement>) => {
    // alert('Your data was recorded.');
    event.preventDefault(); //not sure what this does-- cpy paste from Login.tsx
  };

  //follow login in Login.tsx
  return (
    <Layout>
      <div className="container">
        <h1>My Habits</h1>
        <p className="lead">Tell us about yesterday.</p>
        <form onSubmit={collectData}>
          <div className="form-group text-center">
            {/*<form onSubmit= {collectData}> */}
            <p>How many hours did you sleep last night? </p>
            <input
              type="sleepHours"
              placeholder="enter a number here eg) '8' "
              onChange={(event) => setSleep(event.target.value)}
              value={sleepHours}
            />
          </div>
          <div className="form-group text-center">
            {/*<form onSubmit= {collectData}> */}
            <p>'Caffeine intake during the day (mg)' </p>
            <input
              type="caffeine"
              placeholder="one cup of coffee = 65-85 mg"
              onChange={(event) => setCaffeine(event.target.value)}
              value={caffeine}
            />
            <ReactBootstrapSlider min="0" max="10"></ReactBootstrapSlider>
          </div>
          <div>
            <button
              className="button btn btn-md btn-primary"
              type="submit"
              value="Submit"
            >
              Log Data
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default getUserData;

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
