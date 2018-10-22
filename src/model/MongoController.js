const MongoClient = require('mongodb').MongoClient;
const dotObject = require('dot-object');

//remember to change plain id to md5 hashed id
class MongoController  {
  constructor(db, collection) {
    this.db = db;
    this.collection = collection;
    this.url = `mongodb://localhost:27017/${db}`;
  }

  async readOne(id) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).find({
        '_id': id
      }).toArray();
    } catch (e) {
      throw e;
    } finally {
      client.close();
    }

  }
  async readAll() {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).find({}).toArray();
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async query(query) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).find(query).toArray();
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async createOne(new_object) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).insertOne(new_object);
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };
  async bulkCreate(new_object) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).insertMany(new_object);
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async consistentUpdateOne(id, values) {
    let client;
    let valuesDot = {};

    try {
      dotObject.dot(values, valuesDot)
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).updateOne({
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

  async consistentUpdateMany(query, values) {
    let client;
    let valuesDot = {};

    try {
      dotObject.dot(values, valuesDot);
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).updateMany(query, {
        '$set': valuesDot
      });
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };

  async consistentUpdateOneViaQuery(query, values) {
    let client;
    let valuesDot = {};

    try {
      dotObject.dot(values, valuesDot)
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).updateOne(query, {
        '$set': valuesDot
      });
    } catch (e) {
      throw e;
    } finally  {
      client.close();
    }
  };
  async deleteOne(id) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).deleteOne({
        '_id': id
      });
    } catch (e) {
      throw e;
    } finally {
      client.close();
    }
  };

  async deleteMany(query) {
    let client;
    try {
      client = await MongoClient.connect(this.url, {
        useNewUrlParser: true
      });
      return client.db(this.db).collection(this.collection).deleteMany(query);
    } catch (e) {
      throw e;
    } finally {
      client.close();
    }
  };


}





module.exports = MongoController;
