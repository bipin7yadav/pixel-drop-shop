
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // These would come from auth context in a real implementation
  const isLoggedIn = false;
  const cartItemsCount = 0;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brand-teal">
            PixelMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
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

          {/* Search, Cart & Account - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link to="/account">
                <Button variant="ghost" size="icon">
                  <User className="w-6 h-6 text-gray-700" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-sage">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden flex items-center" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
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
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-brand-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
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
