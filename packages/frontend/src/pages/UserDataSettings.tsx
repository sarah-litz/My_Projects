import React, { FormEvent, useState } from 'react';
import { Container, Form,  Card } from 'react-bootstrap';
import { Layout } from '../components/Layout';

export const UserDataSettings: React.FC = () => {
  const [trackCaffeine, setTrackCaffeine] = useState('');
  const [trackBedtime, setTrackBedtime] = useState('');
  const [trackDreams, setTrackDreams] = useState('');
  const [trackMelatonin, setTrackMelatonin] = useState('');

  const selectData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Layout>
      <Card
        style={{
          background: `radial-gradient(
           circle,
           rgba(238, 174, 202, 0.7) 0%,
           rgba(148, 187, 233, 0.7) 100%
         )`
        }}
      >
        <Container>
          <h1>My Habits</h1>
          <p className="lead">
            Here are the metrics you're currently tracking:
          </p>
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
            <p className="lead">
              Here are the other metrics you've opted into:
            </p>
            <Form onSubmit={selectData}>
              <div className="form-group text-center">
                <p>
                  <b>Caffeine intake during the day</b>
                </p>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                    value={trackCaffeine}
                    onChange={(event) => setTrackCaffeine(event.target.value)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  >
                    Track this metric
                  </label>
                </div>
              </div>
              <div className="form-group text-center">
                <p>
                  <b>Hours of sleep each night</b>
                </p>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch2"
                    value={trackBedtime}
                    onChange={(event) => setTrackBedtime(event.target.value)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch2"
                  >
                    Track this metric
                  </label>
                </div>
              </div>

              <div className="form-group text-center">
                <p>
                  <b>Dreaming</b>
                </p>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch3"
                    value={trackDreams}
                    onChange={(event) => setTrackDreams(event.target.value)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch3"
                  >
                    Track this metric
                  </label>
                </div>
              </div>
              <div className="form-group text-center">
                <p>
                  <b>Melatonin use</b>
                </p>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch4"
                    value={trackMelatonin}
                    onChange={(event) => setTrackMelatonin(event.target.value)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch4"
                  >
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
        </Container>
      </Card>
    </Layout>
  );
};
export default UserDataSettings;
