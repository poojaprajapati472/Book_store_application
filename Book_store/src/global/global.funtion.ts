import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OyBzVSCZYwDyDbM8ZTPmgPOFCULkpQTzmP62FRhrKPI1eDxUoMm5i4DbT5zEf6wNzZtddFynjSx8RPGGejlOsJW009M2RI4Nc"
);


export async function createPaymentIntent(data: any) {
    try {
      const customer = await stripe.customers.create({
        email: data.userEmail,
      });
  
      // Create a payment method
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          token: "tok_visa",
        },
      });
  
      // Attach the payment method to the customer
      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customer.id,
      });
  
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.price * 100, // Amount in cents
        currency: "usd",
        customer: customer.id,
        payment_method: paymentMethod.id,
        description: "Purchase of book",
        confirm: true,
        return_url: "https://yourwebsite.com/return",
      });
  
      console.log("Payment intent created successfully");
  
      return paymentIntent;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }
  