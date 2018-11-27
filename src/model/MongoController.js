const MongoClient = require('mongodb').MongoClient;
const dotObject = require('dot-object');

//remember to change plain id to md5 hashed id
class MongoController  {
  constructor(db) {
    this.db = db;
    this.url = `mongodb://localhost:27017/${db}`;
  }

  async readOne(collection, id) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).find({
        '_id': id
      }).toArray();
    } catch (e) {
      throw e;
    } finally {
      client.close();
    }

  }
  async readAll(collection) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).find({}).toArray();
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async query(collection, query) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).find(query).toArray();
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async insertOne(collection, new_object) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).insertOne(new_object);
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };
  async bulkCreate(collection, new_object) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).insertMany(new_object);
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async updateOne(collection, id, values) {
    let client;
    let valuesDot = {};

    try {
      dotObject.dot(values, valuesDot)
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).updateOne({
        '_id': id
      }, {
        '$set': valuesDot
      });
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async consistentUpdateMany(collection, query, values) {
    let client;
    let valuesDot = {};

    try {
      dotObject.dot(values, valuesDot);
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).updateMany(query, {
        '$set': valuesDot
      });
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async consistentUpdateOneViaQuery(collection, query, values) {
    let client;
    let valuesDot = {};

    try {
      dotObject.dot(values, valuesDot)
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).updateOne(query, {
        '$set': valuesDot
      });
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };
  async deleteOne(collection, id) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).deleteOne({
        '_id': id
      });
    } catch (e) {
      throw e;
    } finally {
      client.close();
    }
  };

  async deleteMany(collection, query) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(collection).deleteMany(query);
    } catch (e) {
      throw e;
    } finally {
      client.close();
    }
  };


}





module.exports = MongoController;
