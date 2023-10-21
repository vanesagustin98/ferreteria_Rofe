const postTag = require("../controllers/Tag/postTag")
const deleteTag = require("../controllers/Tag/deleteTag")
const getTag = require("../controllers/Tag/getTag")
const logicT = require("../controllers/Tag/loigTag")

export default async  function Handler(req, res){

  switch (req.method) {
    case "GET":
      try {
          const getTags = await getTag(req.body); 
          return res.status(201).json(getTags);
      } catch (error) {
          return res.status(400).json({ error: error.message });
      }
    case "POST":
      try {
      
        const newProduct = await postTag(req.body); 
        return res.status(201).json(newProduct);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      case "DELETE":
        try {
        const { id, permanently } = req.body
        if (permanently === true) {

          const delTag = await deleteTag(id)
          return res.status(201).json(delTag)
        } else {
          
          const delLogicTag = await logicT(id)
          return res.status(201).json(delLogicTag)
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      break;
  }
};
