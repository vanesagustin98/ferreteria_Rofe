const postSale = require("../controllers/Sales/postSales");
const getAllSales = require("../controllers/Sales/getAllSales");
const getSalesById = require("../controllers/Sales/getSalesById");
export default async function Handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const newSale = await postSale(req.body);
        return res.status(201).json(newSale);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case "GET":
      try {
        const { id } = req.query;
        if (id) {
          const detailId = await getSalesById(id);
          return res.status(200).json(detailId);
        } else {
          const allSale = await getAllSales();
          return res.status(201).json(allSale);
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      break;
  }
}
