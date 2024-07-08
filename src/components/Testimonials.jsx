import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This was the best vacation I've ever had!",
      name: "Jane Doe",
      location: "New York, USA",
    },
    {
      quote: "Amazing experience, highly recommend!",
      name: "John Smith",
      location: "London, UK",
    },
    {
      quote:
        "Toda la organizacion y atencion estuve increible, este tipo de viajes hay que hacerlo almenos una vez en la vida.",
      name: "Maria Garcia",
      location: "Madrid, Spain",
    },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Comentarios de nuestros usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-lg">
              <p className="text-gray-800 italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-bold text-gray-800">{testimonial.name}</p>
              <p className="text-gray-600">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
