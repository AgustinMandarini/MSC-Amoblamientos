const { findAllProducts } = require("../controllers/getProductController");

const getProductHandler = async (req, res) => { 
  try {
    const { name, type, color, material, orderBy, orderDirection } = req.query;
    const products = await findAllProducts(name, type, color, material, orderBy, orderDirection);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProductHandler };
