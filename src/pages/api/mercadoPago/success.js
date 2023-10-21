export default (req, res) => {
  // Accede a los parámetros de la URL utilizando req.query
  const collectionId = req.query.collection_id;
  const collectionStatus = req.query.collection_status;
  const paymentId = req.query.payment_id;
  const status = req.query.status;
  const externalReference = req.query.external_reference;
  const paymentType = req.query.payment_type;
  const merchantOrderId = req.query.merchant_order_id;
  const preferenceId = req.query.preference_id;
  const siteId = req.query.site_id;
  const processingMode = req.query.processing_mode;
  const merchantAccountId = req.query.merchant_account_id;

  console.log("collectionStatus", collectionStatus);
  console.log("collectionId", collectionId);
  console.log("status", status);
  console.log("paymentId", paymentId);
  console.log("preferenceId", preferenceId)



  res.writeHead(307, { Location: "/" });
  res.end();

  //   res.status(200).json({
  //     success: true,
  //     message: "Petición recibida exitosamente",
  //     // Puedes incluir más datos en la respuesta si es necesario
  //   });
};
