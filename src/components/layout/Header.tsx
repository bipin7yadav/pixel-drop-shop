import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  
  // These would come from auth context in a real implementation
  const isLoggedIn = false;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold text-brand-teal">
            PixelDrop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-brand-teal transition-colors">
              All Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-brand-teal transition-colors">
              Categories
            </Link>
            <Link to="/sale" className="text-gray-700 hover:text-brand-teal transition-colors">
              Sale
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-brand-teal"
              onClick={toggleSearch}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-brand-teal"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              onClick={toggleMenu}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
              />
              <Search className="absolute left-7 top-[4.7rem] w-4 h-4 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-brand-teal transition-colors py-2"
                onClick={toggleMenu}
              >
                All Products
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-brand-teal transition-colors py-2"
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link 
                to="/sale" 
                className="text-gray-700 hover:text-brand-teal transition-colors py-2"
                onClick={toggleMenu}
              >
                Sale
              </Link>
              <div className="flex items-center justify-between py-2">
                <Link to="/cart" className="relative flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-gray-700" />
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <span className="ml-2 bg-brand-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
              {isLoggedIn ? (
                <Link 
                  to="/account" 
                  className="flex items-center text-gray-700 hover:text-brand-teal transition-colors py-2"
                  onClick={toggleMenu}
                >
                  <User className="w-5 h-5 mr-2" />
                  My Account
                </Link>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  <Button className="w-full bg-brand-teal hover:bg-opacity-90">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
