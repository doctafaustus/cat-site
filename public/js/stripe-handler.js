var handler = StripeCheckout.configure({
	key: 'pk_test_OKClfKEUHvsE9Bpb9hoptSGV',
	//image: 'images/stripe-logo.png',
	locale: 'auto',
	token: function(token) {

		$.ajax({
			url: '/charge',
			type: 'POST',
			data: {
				stripeToken: token.id,
				stripeEmail: token.email,
			},

			success: function() {
				console.log('Success!');
				//window.location.href = '/recipes';
			},

			error: function(jqXHR) {
				console.log('Some error occurred');
			},

		});
	}
});

$('.pack-download').click(function(e) {
  e.preventDefault();

  var price = Number($(this).attr('data-price'));
  var packLetter = $(this).attr('id').match(/-(\w)/)[1].toUpperCase();

	handler.open({
		name: 'Completely Absurd Trivia',
		description: `Trivia Pack ${packLetter}`,
		amount: price,
		allowRememberMe: false,
	});
});

// 4242424242424242