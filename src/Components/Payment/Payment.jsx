import { useLocation } from "react-router";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_piblishable_api_key);

const Payment = () => {
  const { state } = useLocation();
  const { trainer, slot, package: selectedPackage } = state || {};

  if (!state) return <p>No booking selected.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Payment Info</h2>
      <div className="mb-4 space-y-1 text-sm">
        <p>Trainer: {trainer.fullName}</p>
        <p>Slot: {slot}</p>
        <p>Package: {selectedPackage.name}</p>
        <p>Price: ${selectedPackage.price}</p>
      </div>

      <Elements stripe={stripePromise}>
        <PaymentForm
          trainer={trainer}
          slot={slot}
          selectedPackage={selectedPackage}
        />
      </Elements>
    </div>
  );
};

export default Payment;
