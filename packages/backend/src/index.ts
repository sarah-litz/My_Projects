import express from 'express';

const app = express();

app.use('*', (req, res) => res.send('Hello!'));

app.listen(4000, () => {
  console.log('Starting backend on port 4000.');
});
