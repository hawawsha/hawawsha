export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { paymentId } = req.body;
        const PI_API_KEY = process.env.PI_API_KEY; // هذا السطر سيقرأ المفتاح الذي أضفته في الصورة

        // إرسال طلب الموافقة الرسمي لشبكة باي
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return res.status(200).json({ status: 'approved' });
        } else {
            return res.status(500).json({ error: 'Approval failed' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
