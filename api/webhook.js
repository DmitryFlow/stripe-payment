const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//module.exports = async (req, res) => {
export default async (req, res) => {
	const sig = req.headers['stripe-signature'];
	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'payment_intent.succeeded') {
		const paymentIntent = event.data.object;

		// Aquí puedes manejar el envío de correos electrónicos, actualizar la base de datos, etc.
		console.log('PaymentIntent was successful!');
		// Ejemplo: enviar correo electrónico
		// sendEmail(paymentIntent.metadata);
	}

	res.status(200).end();
};

// Ejemplo de función para enviar correos electrónicos
const sendEmail = (metadata) => {
	// Lógica para enviar un correo electrónico
};