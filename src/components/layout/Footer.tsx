
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-teal">PixelMart</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for high-quality products with exceptional service and fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-600 hover:text-brand-teal text-sm">All Products</Link></li>
              <li><Link to="/categories" className="text-gray-600 hover:text-brand-teal text-sm">Categories</Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-brand-teal text-sm">Sale</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-600 hover:text-brand-teal text-sm">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-teal text-sm">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-brand-teal text-sm">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-brand-teal text-sm">FAQs</Link></li>
              <li><Link to="/size-guide" className="text-gray-600 hover:text-brand-teal text-sm">Size Guide</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-teal text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-brand-teal text-sm">Careers</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-brand-teal text-sm">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-brand-teal text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} PixelMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
