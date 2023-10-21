import deleteSuppliers from "../controllers/suppliers/deleteSuppliers";
import getSuppliers from "../controllers/suppliers/getSuppliers";
import putSuppliers from "../controllers/suppliers/putSuppliers";
import postSuppliers from "../controllers/suppliers/postSuppliers";
const logicS = require("../controllers/suppliers/loigSupplier")

const handlerSuppliers = async (req, res) => {
  const { method, body } = req;

  try {
    if (method === "GET") {
      const response = await getSuppliers();
      res.status(200).json(response);
    } else if (method === "POST") {
      const { name, cellphone, name_company, isActive } = body;
      if (!name || !cellphone || !name_company || !isActive) {
        res
          .status(400)
          .json({ error: "You must enter all the requested data" });
        return;
      }
      const response = await postSuppliers(body);
      res.status(200).json(response);
    } else if (method === "PUT") {
      const { id } = body;
      if (!id) {
        res.status(400).json({ error: "Missing id" });
        return;
      }
      const response = await putSuppliers(body);
      res.status(200).json(response);
    } else if (method === "DELETE") {
      const { id_suppliers, permanently } = body;
      if (permanently === true) {

        const delLogicSupplier = await deleteSuppliers(id_suppliers)
        return res.status(201).json(delLogicSupplier)
      } else {

        const response = await logicS(id_suppliers);
        res.status(200).json(response);
      }

    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handlerSuppliers;
