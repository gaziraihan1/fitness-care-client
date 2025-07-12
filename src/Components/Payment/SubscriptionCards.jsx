const packages = [
  {
    name: "Basic Membership",
    benefits: [
      "Access to gym facilities during regular hours",
      "Use of cardio and strength equipment",
      "Access to locker rooms and showers",
    ],
    price: 10,
  },
  {
    name: "Standard Membership",
    benefits: [
      "All benefits of Basic",
      "Group fitness classes (Yoga, Zumba)",
      "Use of sauna/steam room",
    ],
    price: 50,
  },
  {
    name: "Premium Membership",
    benefits: [
      "All benefits of Standard",
      "Personal training with certified trainers",
      "Discounts on massage & nutrition services",
    ],
    price: 100,
  },
];

const SubscriptionCards = ({ onSelect }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="border rounded-lg shadow p-6 bg-white hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-3">{pkg.name}</h3>
          <ul className="text-sm mb-4 space-y-1">
            {pkg.benefits.map((b, i) => (
              <li key={i}>✅ {b}</li>
            ))}
          </ul>
          <p className="text-lg font-semibold">Price: ${pkg.price}</p>
          <button
            onClick={() => onSelect(pkg)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Join Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCards;
