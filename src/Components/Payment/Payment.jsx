import { useLocation } from "react-router";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_piblishable_api_key);

const Payment = () => {
  useEffect(() => {
      document.title = "Fitness Care | Payment";
    }, []);
  const { state } = useLocation();
  const { trainer, package: selectedPackage, classId, slotId } = state || {};

  const axiosSecure = useAxiosSecure();

  const { data: slot, isLoading } = useQuery({
    queryKey: ["slot", slotId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/${slotId}`);
      return res.data;
    },
    enabled: !!slotId,
  });

  if (!state || !slotId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500 dark:text-gray-300">No booking selected.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-blue-500">Loading slot info...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/60 dark:bg-gray-900 backdrop-blur-md border border-blue-100 dark:border-gray-700 shadow-xl rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-white mb-8">
          💳 Complete Your Payment
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              🧾 Payment Summary
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-white/80">
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Trainer:</span>{" "}
                {trainer?.fullName}
              </div>
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Slot:</span>{" "}
                {slot.slotName} ({slot.slotTime})
              </div>
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Days:</span>{" "}
                {slot.days?.join(", ")}
              </div>
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Package:</span>{" "}
                {selectedPackage?.name}
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-gray-300 pt-2">
                Total: ${selectedPackage?.price}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">
              💸 Enter Payment Details
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-600 shadow">
              <Elements stripe={stripePromise}>
                <PaymentForm
                  trainer={trainer}
                  slot={slot}
                  selectedPackage={selectedPackage}
                  classId={classId}
                  slotId={slotId}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
