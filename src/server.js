require('dotenv').config

import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import { readFileSync } from 'fs';

// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');

const dev = false;
const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 4848;

const httpsOptions = {
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt'),
  ca: fs.readFileSync('./ssl/ca_bundle.crt'),
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
  .once('error', (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`Ready on https://${hostname}:${port}`);
  });
});