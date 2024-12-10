// eslint-disable-next-line @typescript-eslint/no-unused-vars


import {
  PiCheckCircleFill,
  PiHouseFill,
  PiUserCheck,
} from "react-icons/pi";

const Section = () => {
  const items = [
    {
      icon: <PiHouseFill className="text-5xl text-red-500" />,
      name: "Connect",
      description: "Link your digital wallet to our platform securely.",
    },
    {
      icon: <PiUserCheck className="text-5xl text-sky-600" />,
      name: "Verify",
      description:
        "Input your credentials and get them verified by the issuing institution.",
    },
    {
      icon: <PiCheckCircleFill className="text-5xl text-orange-500" />,
      name: "Share",
      description:
        "Receive your credentials as NFTs and share them securely with employers or institutions.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-semibold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl shadow-lg transform transition-transform hover:scale-105"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-3xl font-bold mb-4">{item.name}</h3>
              <p className="text-lg text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
