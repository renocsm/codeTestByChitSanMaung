import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import OrderEVoucher from "../EVoucher/OrderEVoucher"
 
const PUBLIC_KEY = "pk_test_51K2A94HRos6m7rSToQkMJiICMmXa0STcmeYL9MEFJ4ckky0W8MO8KZgmgrklXsRsFdRAiAKARP5LecndORnriZ9Y00nNYNwxFp"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<OrderEVoucher />
		</Elements>
	)
}