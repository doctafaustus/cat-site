// Express
const express = require('express');
const bodyParser = require('body-parser');

// Stripe
const stripeSK = '';
const stripe = require("stripe")(stripeSK);

// Express
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));




app.get('/', (req, res) => {
	res.render('/');
});


app.post('/charge', (req, res) => {

  stripe.customers.create({
	  description: `Customer for ${req.body.stripeEmail}`,
	  source: req.body.stripeToken,
	  email: req.body.stripeEmail,
	}, (err, customer) => {

		if (err) console.log(err);
		console.log('Customer created:', customer);

		stripe.charges.create({
		  amount: 499,
		  currency: 'usd',
		  customer: customer.id,
		  description: `Charge for ${req.body.stripeEmail}`,
		}, (err, charge) => {

			console.log('Charge created:', charge);
			res.sendStatus(200);
	  });
	});
});


app.listen(process.env.PORT || 3000, () => {
	console.log('App listening on port 3000');
});




