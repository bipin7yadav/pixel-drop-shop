import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useClerkAuth } from '@/contexts/ClerkAuthContext';

export default function NotFound() {
  const { isAuthenticated } = useClerkAuth();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
        {!isAuthenticated && (
          <Button variant="outline" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
