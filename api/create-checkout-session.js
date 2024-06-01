const stripe = require('stripe')('sk_test_51PHS7yAlI4elvZn3wZHyyXt95qSuGMOCcirsSn2wmWl2O7ZXDWAFl0JHW6ipiuv5O2rB8nLBTDTagjhj7SixuOBx000Aikat9m'); // Reemplaza con tu clave secreta de Stripe

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { price, id } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Total Purchase',
                        metadata: {
                            id: id
                        }
                    },
                    unit_amount: price * 100, // Stripe acepta centavos
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000/summary?orderId=${id}`, // Reemplaza con tu URL de éxito
            cancel_url: `http://localhost:3000/summary?orderId=${id}`,  // Reemplaza con tu URL de cancelación
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create session' });
    }
};
