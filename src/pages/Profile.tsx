
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Settings, User, Clock, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { darkMode } = useTheme();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  return (
    <div className="container py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-2xl">Account Information</CardTitle>
                <CardDescription>View and manage your account details</CardDescription>
              </div>
              <User className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Email</h3>
                <p className="text-lg">{user?.email}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Name</h3>
                <p className="text-lg">{user?.name || 'Not set'}</p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleLogout} 
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent activity on the platform</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground">No recent activity to display.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your preferences</CardDescription>
              </div>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`border ${darkMode ? 'border-primary/20' : 'border-primary/10'} bg-gradient-to-br from-primary/5 to-accent/5`}>
            <CardHeader>
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>Upgrade to unlock premium tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Advanced AI Tools
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Unlimited Generations
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Priority Support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
