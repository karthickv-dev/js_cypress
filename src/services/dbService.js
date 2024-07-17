/* eslint-disable no-unsafe-finally */
exports.fetchWdlCache = (requestBody) => {
  // Convert JSON body request to MongoDB query
  const query = requestBody.map((item) => {
    return {
      accountNo: item.accountNo,
      accountType: item.accountType,
    };
  });

  // Call the fetchData function with the query
  return fetchData(query);
};

async function fetchData(query) {
  var encodePassword = encodeURIComponent(process.env.PASSWORD);

  const { MongoClient, ServerApiVersion } = require("mongodb");

  // Connection URI
  const uri = `mongodb+srv://${process.env.USER}:${encodePassword}@${process.env.CLUSTER_NAME}.mongodb.net/`;

  // Database Name
  const dbName = process.env.DB_NAME;

  // Collection Name
  const collectionName = "accountDetails";

  // Create a new MongoClient
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  let result;

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the collection
    const collection = db.collection(collectionName);

    // Fetch data
    result = await collection
      .find({ $or: query }, { projection: { _id: 0 } })
      .toArray();

    // Print the result
    //return result;
  } catch (err) {
    console.log("Error:", err);
  } finally {
    // Close the connection when finished
    await client.close();
    return result;
  }
}

exports.updateWdlCache = (jsonData) => {
  // Call the insertData function
  return updateIfNewData(jsonData);
};

async function updateIfNewData(jsonData) {
  var encodePassword = encodeURIComponent(process.env.PASSWORD);

  const { MongoClient, ServerApiVersion } = require("mongodb");

  // Connection URI
  const uri = `mongodb+srv://${process.env.USER}:${encodePassword}@${process.env.CLUSTER_NAME}.mongodb.net/`;

  // Database Name
  const dbName = process.env.DB_NAME;

  // Collection Name
  const collectionName = "accountDetails";

  // Create a new MongoClient
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  let result;

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the collection
    //const collection = db.collection(collectionName);

    // Update data
    for (const newData of jsonData) {
      const filter = { accountNo: newData.accountNo };
      const update = { $set: newData };
      const options = { upsert: true };

      try {
        result = await db.collection(collectionName)
          .updateOne(filter, update, options);

        if (result.upsertedCount === 1) {
          console.log(
            `Document with accountNo ${newData.accountNo} inserted successfully!`
          );
        } else {
          console.log(
            `Document with accountNo ${newData.accountNo} updated successfully!`
          );
        }
      } catch (error) {
        console.error(
          `An error occurred for document with accountNo ${newData.accountNo}:`,
          error
        );
      }
    }

    // Print the result
    //return result;
  } catch (err) {
    console.log("Error:", err);
  } finally {
    // Close the connection when finished
    await client.close();
    return result;
  }
}
