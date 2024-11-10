const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://dbAskUser:dbAskPassword@cluster0.v5lvs.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
    //res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Could not store data." });
  } finally {
    await client.close();
  }

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.status(500).json({ message: "Could not retrieve products." });
  } finally {
    await client.close();
  }

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
