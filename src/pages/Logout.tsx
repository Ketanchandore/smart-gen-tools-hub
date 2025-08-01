
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      logout();
      navigate('/');
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="container flex items-center justify-center min-h-[90vh] py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Logging you out...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we securely log you out
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logout;
