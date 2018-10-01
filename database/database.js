var mongoose = require('mongoose');

class DatabaseWrapper {

  constructor(connectionString)
  {
    this.connectionString = connectionString;
    this.isConnected = false;
  }

  get connectionStatus()
  {
    return this._isConnected;
  }

  connectDatabase()
  {
    mongoose.connect(this.connectionString,
      { useNewUrlParser: true }
    );
  }

  insertObjectToDatabase(objectToInsert, mongooseModelObject)
  {
    objectToInsert.save(function(err, mongooseModelObject){
      if (err)
      {
        console.log("Cannot write to database");
        console.log(err);
      }
    });
  }

  getObjectFromDatabase(mongooseModelObject)
  {
    return new Promise((resolve, reject) => {
      mongooseModelObject.find({}, function(err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}

exports.DatabaseWrapper = DatabaseWrapper;
