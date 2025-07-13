import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentForm = ({ trainer, slot, selectedPackage }) => {
  const stripe = useStripe();
  const axiosSecure = useAxiosSecure();
  const elements = useElements();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: selectedPackage.price,
    });
    const clientSecret = data.clientSecret;

    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card,
    billing_details: {
      name: user?.displayName,
      email: user?.email,
    },
  },
});


    if (paymentIntent?.status === "succeeded") {
      const paymentData = {
        userName: user.displayName,
        userEmail: user.email,
        trainerName: trainer.fullName,
        trainerId: trainer._id,
        slot,
        package: selectedPackage.name,
        price: selectedPackage.price,
        date: new Date(),
      };

      await axiosSecure.post("/payments", paymentData);

      const bookingData = {
      ...paymentData,
      trainerImage: trainer.profileImage,
      className: selectedPackage.name + " Class",
      status: "booked",
      createdAt: new Date(),
    };

    await axiosSecure.post("/bookings", bookingData);

      alert("Payment successful!");
    } else if (error) {
      alert(error.message);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardStyle} className="border p-4 rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {processing ? "Processing..." : `Pay $${selectedPackage.price}`}
      </button>
    </form>
  );
};

export default PaymentForm;
