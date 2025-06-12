import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Menu, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Pine Tools <span className="hidden sm:inline text-foreground">Hub</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Tools
          </Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={20} />
          </a>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <User size={18} className="mr-2" />
                  {user?.name || user?.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
              <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col space-y-4 py-4">
                <Link 
                  to="/" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/blog" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <div className="pt-4 flex flex-col space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 px-2 py-1.5">
                        <User size={16} />
                        <span className="font-medium">{user?.name || user?.email?.split('@')[0]}</span>
                      </div>
                      <Link 
                        to="/profile" 
                        className="text-base font-medium hover:text-primary transition-colors px-2 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="text-base font-medium hover:text-primary transition-colors px-2 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="mt-2"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}>
                        Sign In
                      </Button>
                      <Button onClick={() => {
                        navigate('/signup');
                        setIsMenuOpen(false);
                      }}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
