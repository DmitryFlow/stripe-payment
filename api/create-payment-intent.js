import firebase from 'firebase/app';
import { getApps, initializeApp } from "firebase/app";
import 'firebase/firestore';

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

const firebaseConfig = {
    apiKey: "AIzaSyD0f07_UVK0Q5SrMZw6M6vGrHvG3yI30iQ",
    authDomain: "allure-premium-service-a4a9d.firebaseapp.com",
    projectId: "allure-premium-service-a4a9d",
    storageBucket: "allure-premium-service-a4a9d.appspot.com",
    messagingSenderId: "122912019501",
    appId: "1:122912019501:web:ebf41e44668ca038e854a4",
    measurementId: "G-JFKF4BW6V3"
};

if (getApps().length < 1) {
	initializeApp(firebaseConfig);
}

//module.exports = async (req, res) => {
export default async (req, res) => {
	if (req.method === 'POST') {
		//const { amount, currency, orderId, clientID } = req.body;
		const { orderId, productId } = req.body;
		let product;

		try {
			/*const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency,
				metadata: {
					orderId,
					clientID
				}
			});*/
			// Aquí puedes hacer una consulta al servidor de tu base de datos o a Stripe para obtener el producto según su ID
			/*await fetch('https://api.stripe.com/v1/products', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${stripe}`
				}
			})	
			.then(response => response.json())
			.then(async data => {
				const productName = 'Allure order Nº ' + orderId;
				const product = data.data.find(product => product.name === productName);
				if (product) {
					try {
						const db = firebase.firestore();
						const orderRef = db.collection('orders').doc(orderId);
						const doc = await orderRef.get();
						if (doc.exists) {
							const data = doc.data();
							product = data;
						} else {
							console.error('GET PRODUCT: No order with id: ' + orderId);
							return;
						}
					} catch (error) {
						console.error('GET PRODUCT: Error geeting document: ', error);
						return;
					}
				} else {
					console.log('GET PRODUCT: No product found. Next step, create product.');
				}
			})
			.catch(error => {
				console.error('GET PRODUCT: Error product: ', error)
			});*/

			//res.status(200).json({ clientSecret: paymentIntent.client_secret });
			//res.status(200).send(product.name);
			res.status(200).send("TEST: " + orderId + ", " + productId);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};