var stripeKey = 'pk_live_gqs0Ep4CGJOOQdaQtMJkMKZv';

var signupVue = new Vue({
	el: "#hero",
	data: {
		stage: 1,
		membership: '',
		name: '',
		email: '',
		password: '',
		passwordconfirm: '',
		studentid: '',
	},
	methods: {
		nextStage: function(stage) {

			if(stage == 2) {
				if(this.name == '' || this.email == '' || this.password == '' || this.passwordconfirm == '') {

				} else {
					this.stage = stage;
					setTimeout(function() {
						addE();
					}, 500)

				}
			} else {
				this.stage = stage;
			}
		}
	}
});





var semesterHandler = StripeCheckout.configure({
	key: stripeKey,
	image: 'https://s3.amazonaws.com/stripe-uploads/acct_19kQoaG3EkjoBhC1merchant-icon-1487288662164-Sudo.png',
	locale: 'auto',
	token: function(token) {
		app.loading = true;
		// GET /someUrl
		Vue.http.post('/steps/pay', { paymentInput: 1, token: token.id }).then(function(response) {
			app.user = response.body;
			app.updateData();
			app.loading = false;
		}, function(response) {
			// error callback
		});
	}
});

var yearlyHandler = StripeCheckout.configure({
	key: stripeKey,
	image: 'https://s3.amazonaws.com/stripe-uploads/acct_19kQoaG3EkjoBhC1merchant-icon-1487288662164-Sudo.png',
	locale: 'auto',
	token: function(token) {
		app.loading = true;
		// GET /someUrl
		Vue.http.post('/steps/pay', { paymentInput: 2, token: token.id }).then(function(response) {
			app.user = response.body;
			app.updateData();
			app.loading = false;
		}, function(response) {
			// error callback
		});
	}
});


function addE() {
	document.getElementById('semesterButton').addEventListener('click', function(e) {

		// Open Checkout with further options:
		semesterHandler.open({
			name: 'UC Sudo',
			description: 'Semester Membership',
			zipCode: false,
			currency: 'aud',
			amount: 500,
			email: signupVue.email
		});
		e.preventDefault();
	});

	document.getElementById('yearButton').addEventListener('click', function(e) {

		// Open Checkout with further options:
		yearlyHandler.open({
			name: 'UC Sudo',
			description: 'Yearly Membership',
			zipCode: false,
			currency: 'aud',
			amount: 1000,
			email: signupVue.email
		});
		e.preventDefault();
	});
}
