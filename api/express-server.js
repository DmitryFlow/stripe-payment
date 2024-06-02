import express from 'express';
import request from 'request';

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://allurepremiumservice.com');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/api/test-get', (req, res) => {
  res.json({ message: 'GET request successful!' });
});

app.get('/api/jokes/random', (req, res) => {
  request(
    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

export default app;