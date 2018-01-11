// Modules
const fs = require('fs');
const favicon = require('serve-favicon');

// Express
const express = require('express');
const bodyParser = require('body-parser');

// Stripe
// const stripeSK = process.env.PORT ? process.env.STRIPE_LIVE_SK : fs.readFileSync('./private/stripe-test-secret-key.txt').toString();
const stripeSK = STRIPE_TEST_SK;
const stripe = require('stripe')(stripeSK);

// Express
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
//app.use(favicon(__dirname + '/public/images/favicon.ico'));




app.get('/', (req, res) => {
	res.render('index.ejs');
});


app.post('/charge', (req, res) => {

  stripe.customers.create({
	  description: `Customer for ${req.body.stripeEmail}`,
	  source: req.body.stripeToken,
	  email: req.body.stripeEmail,
	}, (err, customer) => {

		if (err) console.log(err);

		stripe.charges.create({
		  amount: req.body.price,
		  currency: 'usd',
		  customer: customer.id,
		  description: `Charge for ${req.body.stripeEmail}`,
		}, (err, charge) => {
			res.sendStatus(200);
	  });
	});
});


app.get('/download', (req, res) => {

	let pack;
	switch(req.query.pack) {
		case 'a':
			pack = 'a-3011';
			break;
		case 'b':
			pack = 'b-1000';
			break;
		case 'c':
			pack = 'c-2998';
			break;
	}

  res.download(__dirname + `/public/questions/question-pack-${pack}.zip`);
});


app.listen(process.env.PORT || 3000, () => {
	console.log('App listening on port 3000');
});




