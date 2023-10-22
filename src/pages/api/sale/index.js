const postSale = require("../controllers/Sale/postSale.js")
const getSale = require("../controllers/Sale/getSale.js")
const getSaleDetail = require("../controllers/Sale/getSaleDetail.js")
export default async function handlerSale (req, res){
    const {
        query: { id, name },
        method,
      } = req;
 
    switch (method) {
        case "POST":
            try {
 
              console.log("eeeeeeeee");
                const newSale = await postSale(req.body);
                return res.status(201).json(newSale);
              } catch (error) {
                return res.status(400).json({ error: error.message });
              }
   
        case "GET":
            
        try {
          
          if(id){
            const sale = await getSaleDetail(id);
            return res.status(201).json(sale);
          }else {
            const sale = await getSale();
            return res.status(201).json(sale);
          }

        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
    
        default:
            break;
    }
}