$('.pack-download').click(function(e) {
  e.preventDefault();

  var price = Number($(this).attr('data-price'));
  var packLetter = $(this).attr('id').match(/-(\w)/)[1];
  $('#download-bar-btn').attr('href', `/download?pack=${packLetter}`);

  window.selectedPack = packLetter;


	var handler = StripeCheckout.configure({
		// key: 'pk_test_OKClfKEUHvsE9Bpb9hoptSGV', // Test Data
		key: 'pk_live_WoScdx61kcdTsm7TbBSalh8j',
		image: './images/stripe-logo.png',
		locale: 'auto',
		token: function(token) {

			$.ajax({
				url: '/charge',
				type: 'POST',
				data: {
					price: price,
					stripeToken: token.id,
					stripeEmail: token.email,
				},

				success: function() {
					console.log('Successful purchase!');
					window.sessionStorage.purchasedPack = window.selectedPack;;

					var $downloadBar = $('#download-bar');
					$downloadBar.slideUp(function() {
						$downloadBar.slideDown();
					});
					
				},

				error: function(jqXHR) {
					console.log('Some error occurred');
					var $errorBar = $('#error-bar');
					$errorBar.show(function() {
						setTimeout(function() {
							$errorBar.hide();
						}, 6000);
					});
				},

			});
		}
	});

	handler.open({
		name: 'Completely Absurd Trivia',
		description: `Trivia Pack ${packLetter.toUpperCase()}`,
		amount: price,
		allowRememberMe: false,
	});
});



// 4242424242424242