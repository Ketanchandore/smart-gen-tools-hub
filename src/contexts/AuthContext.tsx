
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Initialize authentication state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
        toast({
          title: "Session error",
          description: "There was an issue with your login session. Please log in again.",
          variant: "destructive"
        });
      }
    }
    setLoading(false);
  }, []);

  // Mock authentication functions (replace with real API calls)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (replace with actual API call)
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // In a real app, you would validate credentials with a backend
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Login successful!",
        description: `Welcome back, ${newUser.name || 'user'}!`,
      });
      
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (replace with actual API call)
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // In a real app, you would register with a backend
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: name || email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Registration successful!",
        description: `Welcome, ${newUser.name || 'user'}!`,
      });
      
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Registration error",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive"
      });
      throw new Error("Not authenticated");
    }
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update user data
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        signup, 
        logout,
        updateProfile,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
