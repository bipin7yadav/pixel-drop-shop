
const testimonials = [
  {
    id: 1,
    content: "I'm extremely impressed with the quality of the products and the fast shipping. Will definitely be ordering again!",
    author: "Sarah Johnson",
    role: "Verified Buyer",
  },
  {
    id: 2,
    content: "The customer service team went above and beyond to help me with my order. 5 stars all around!",
    author: "Michael Chen",
    role: "Verified Buyer",
  },
  {
    id: 3,
    content: "Fantastic products at great prices. The website is easy to use and my order arrived faster than expected.",
    author: "Emily Rodriguez",
    role: "Verified Buyer",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Don't just take our word for it - see what our customers have to say
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className="w-5 h-5 text-yellow-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
