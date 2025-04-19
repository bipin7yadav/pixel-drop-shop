
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg",
    slug: "electronics",
  },
  {
    id: 2,
    name: "Clothing",
    image: "/placeholder.svg",
    slug: "clothing",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "/placeholder.svg",
    slug: "home-kitchen",
  },
  {
    id: 4,
    name: "Beauty",
    image: "/placeholder.svg",
    slug: "beauty",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Shop by Category
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Explore our wide range of products across popular categories
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              to={`/categories/${category.slug}`} 
              key={category.id}
              className="group relative rounded-lg overflow-hidden"
            >
              <div className="aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/categories">
            <button className="text-brand-teal hover:text-opacity-80 font-medium inline-flex items-center">
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
