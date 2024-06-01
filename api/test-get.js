export default function handler(req, res) {
	//res.setHeader('Access-Control-Allow-Origin', 'https://allurepremiumservice.com');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}

	if (req.method === 'GET') {
		res.status(200).json({ message: 'GET successful!' });
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
  