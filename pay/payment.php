<?php

	require __DIR__ . '/vendor/autoload.php';

	// Set your secret key: remember to change this to your live secret key in production
	// See your keys here: https://dashboard.stripe.com/account/apikeys
	\Stripe\Stripe::setApiKey("sk_test_6ydSf5TxIMIJYYbPAe2CtFZB");

	// Token is created using Stripe.js or Checkout!
	// Get the payment token submitted by the form:
	$token = $_POST['stripeToken'];

	// Charge the user's card:
	$charge = \Stripe\Charge::create(array(
		"amount" => 1000,
		"currency" => "aud",
		"description" => "Yearly Charge",
		"source" => $token,
	));


?>
