require("dotenv").config();

const mercadoPago = require("mercadopago");
console.log("1");
mercadoPago.configure({
  access_token:
    "TEST-418055106966037-092100-95981951fc976933f147e9258f36b8f1-582245292",
});

export default async (req, res) => {
  let preference = {};
  const { method, body } = req;
  if (method == "POST") {
    const { product } = body;
    preference = {
      items: [
        {
          title: product.description,
          unit_price: Number(product.price),
          quantity: 1,
        },
      ],
      back_urls: {
        success: "http://localhost:3000/api/mercadoPago/success",
        failure: "http://localhost:3000",
        pending: "",
      },
      auto_return: "approved",
    };

    try {
      const response = await mercadoPago.preferences.create(preference);
      //aca devuelve solo el id para que se pueda verificar el registro
      res.status(200).json({ id: response.body.id });
    } catch (preferenceError) {
      console.error("Error al crear la preferencia:", preferenceError);
      res.status(500).json({ error: "Error al crear la preferencia" });
    }
  }
};
