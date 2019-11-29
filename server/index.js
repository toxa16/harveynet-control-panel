const { Server } = require('http');

const app = require('./app');

const server = new Server(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('HarveyNet Control Panel production server listening on port '
    + server.address().port + '...');
});
