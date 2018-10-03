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
    return new Promise((resolve, reject) => {
      objectToInsert.save(function(err, mongooseModelObject){
        if (err)
        {
          reject(err);
        }
        resolve();
      });
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

  removeObjectFromDatabase(objectName, mongooseModelObject)
  {
    return new Promise((resolve, reject) => {
      mongooseModelObject.deleteOne({"name": objectName}, function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

exports.DatabaseWrapper = DatabaseWrapper;
