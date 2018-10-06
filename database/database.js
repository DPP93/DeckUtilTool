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

  getObjectFromDatabase(cardName, mongooseModelObject)
  {
    return new Promise((resolve, reject) => {
      mongooseModelObject.find({"name": cardName}, function(err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

  getObjectsFromDatabase(mongooseModelObject)
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

  updateOneObject(objectOldName, newObjectName, mongooseModelObject)
  {
    return new Promise((resolve, reject) => {
      mongooseModelObject.updateOne({"name": objectOldName},
      {"name": newObjectName},
      function(err, response) {
        if (err ) {
          reject(err);
        }
        if (response.n === 0)
        {
          reject("Nothing was updated, the card probably is not existing");
        }
        resolve(response);
      })
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
