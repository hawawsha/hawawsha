export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paymentId } = req.body;

  console.log("APPROVE PAYMENT:", paymentId);

  // في Sandbox لا نحتاج موافقة حقيقية
  return res.status(200).json({
    success: true,
    paymentId
  });
}
