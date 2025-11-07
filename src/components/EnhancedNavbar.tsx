import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Menu, User, LogOut, Moon, Sun, Search, ChevronDown, FileText, Calculator, Wand2, Image, Code, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const toolCategories = [
    {
      name: 'PDF Tools',
      icon: FileText,
      tools: [
        { name: 'PDF to Word', route: '/pdf-to-word' },
        { name: 'Merge PDF', route: '/merge-pdf' },
        { name: 'Compress PDF', route: '/compress-pdf' },
        { name: 'Split PDF', route: '/split-pdf' },
        { name: 'PDF to JPG', route: '/pdf-to-jpg' },
        { name: 'Protect PDF', route: '/protect-pdf' },
      ]
    },
    {
      name: 'Calculators',
      icon: Calculator,
      tools: [
        { name: 'Password Generator', route: '/password-generator' },
        { name: 'QR Code Generator', route: '/qr-code' },
        { name: 'Barcode Generator', route: '/barcode-generator' },
        { name: 'Lorem Ipsum', route: '/lorem-ipsum' },
      ]
    },
    {
      name: 'AI Tools',
      icon: Wand2,
      tools: [
        { name: 'Image Generator', route: '/image-generator' },
        { name: 'Blog Writer', route: '/blog-writer' },
        { name: 'Resume Builder', route: '/resume-builder' },
        { name: 'Smart Copy', route: '/smart-copy' },
      ]
    },
    {
      name: 'Image Tools',
      icon: Image,
      tools: [
        { name: 'Image Compressor', route: '/image-compressor' },
        { name: 'Image Converter', route: '/image-converter' },
        { name: 'Image Enhancer', route: '/image-enhancer' },
        { name: 'Avatar Generator', route: '/avatar-generator' },
      ]
    },
    {
      name: 'Text Tools',
      icon: Code,
      tools: [
        { name: 'Text Case Converter', route: '/text-case-converter' },
        { name: 'Word Counter', route: '/word-counter' },
        { name: 'Blog Rewriter', route: '/blog-rewriter' },
        { name: 'Email Writer', route: '/email-writer' },
      ]
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Pine Tools <span className="hidden sm:inline text-foreground">Hub</span>
          </span>
        </Link>
        
        {/* Desktop Navigation with Mega Menu */}
        <div className="hidden lg:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9">Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] gap-3 p-4 md:grid-cols-3">
                    {toolCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-sm text-primary">
                          <category.icon className="h-4 w-4" />
                          {category.name}
                        </div>
                        <ul className="space-y-1">
                          {category.tools.map((tool) => (
                            <li key={tool.route}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={tool.route}
                                  className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm"
                                >
                                  {tool.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/embed" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent">
            Embed
          </Link>
          <Link to="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent">
            API
          </Link>
          <Link to="/wordpress-plugin" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent">
            WordPress
          </Link>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent">
            Blog
          </Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent">
            Pricing
          </Link>
          
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Search size={20} />
          </Button>
          
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-muted-foreground hover:text-foreground"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
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
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
              <Button size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] overflow-y-auto">
              <div className="flex flex-col space-y-4 py-4">
                <Link 
                  to="/" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Tools
                </Link>
                
                {toolCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-primary">
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </div>
                    <div className="pl-6 space-y-1">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.route}
                          to={tool.route}
                          className="block text-sm text-muted-foreground hover:text-foreground py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Link 
                  to="/embed" 
                  className="text-base font-medium hover:text-primary transition-colors pt-2 border-t"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Embed Tools
                </Link>
                <Link 
                  to="/api" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  API
                </Link>
                <Link 
                  to="/wordpress-plugin" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  WordPress Plugin
                </Link>
                <Link 
                  to="/blog" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                
                {/* Dark Mode Toggle for Mobile */}
                <div className="flex items-center justify-between py-2 px-2 border-t">
                  <span className="text-base font-medium">Dark Mode</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="h-8 w-8"
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </Button>
                </div>
                
                <div className="pt-4 flex flex-col space-y-2 border-t">
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
      
      {/* Search Bar Dropdown */}
      {showSearch && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container py-4 px-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavbar;
