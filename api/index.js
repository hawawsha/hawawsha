export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { paymentId } = req.body;
        const PI_API_KEY = process.env.PI_API_KEY; // سيقرأ المفتاح الذي أضفته في الصورة

        // استدعاء API الموافقة الرسمي الذي ذكره صديقك
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("تمت الموافقة الرسمية بنجاح");
            return res.status(200).json({ status: 'approved' });
        } else {
            const errorData = await response.json();
            return res.status(500).json({ error: 'Pi Network rejected approval', details: errorData });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
