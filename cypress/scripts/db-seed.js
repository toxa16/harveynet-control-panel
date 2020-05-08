const { MongoClient } = require('mongodb');
require('dotenv').config();

// db params
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}`;


// machines fixture
const aliceUserId = 'auth0|5dd06dbd35a4870f1264aef7';
const bobUserId = 'auth0|5e9f5b4d76bafa0c08d2fd2c';
const machines = [
  {
    userId: aliceUserId,
    machineId: 'machine1',
  },
  {
    userId: aliceUserId,
    machineId: 'machine2',
  },
  {
    userId: aliceUserId,
    machineId: 'machine3',
  },
  {
    userId: bobUserId,
    machineId: 'machine4',
  },
  {
    userId: bobUserId,
    machineId: 'machine5',
  },
];


// database seeding function
async function seedDatabase() {
  const client = await MongoClient.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  const col = db.collection('machines');
  await col.deleteMany({});
  await col.insertMany(machines);
}

console.log('Seeding database...');
seedDatabase()
  .then(() => {
    console.log('seeded successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error occurred while seeding database.');
    console.error(err);
    process.exit(-1);
  });
