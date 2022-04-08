const client = require('mongodb');
const phones = require('./src/phones.json');
var clientInstance = client.MongoClient;
var url = 'mongodb://localhost:27017/';

function insertDummyPhones() {
  clientInstance.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('testdb');
    dbo.collection('Phone').deleteMany({});
    dbo.collection('Phone').insertMany(phones, function (err, res) {
      if (err) throw err;
      console.log(phones.length + ' phones inserted!');
      db.close();
    });
  });
}

insertDummyPhones();
