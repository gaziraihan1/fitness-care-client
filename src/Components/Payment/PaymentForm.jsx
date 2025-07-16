import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = ({ trainer, slot, selectedPackage, slotId, classId }) => {
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

  try {
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
        classId,
        slotId,
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

      Swal.fire({
        icon: "success",
        title: "Payment Successful 🎉",
        text: "Your booking has been confirmed.",
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message || "Something went wrong with your payment.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#d33",
      });
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error",
      text: "An unexpected error occurred. Please try again.",
      confirmButtonColor: "#d33",
    });
  } finally {
    setProcessing(false);
  }
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
