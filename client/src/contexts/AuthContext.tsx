
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
  emailVerified?: boolean;
  lastLogin?: string;
  accountStatus?: 'active' | 'pending' | 'suspended';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Security: Input validation and sanitization
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return { valid: false, message: "Password must contain at least one special character (@$!%*?&)" };
    }
    return { valid: true, message: "" };
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>\"']/g, '');
  };

  // Initialize authentication state from localStorage with security checks
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const sessionExpiry = localStorage.getItem("sessionExpiry");
        
        if (storedUser && sessionExpiry) {
          const now = new Date().getTime();
          const expiry = parseInt(sessionExpiry);
          
          if (now < expiry) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } else {
            // Session expired
            localStorage.removeItem("user");
            localStorage.removeItem("sessionExpiry");
            toast({
              title: "Session expired",
              description: "Please log in again for security.",
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("sessionExpiry");
        toast({
          title: "Session error",
          description: "There was an issue with your login session. Please log in again.",
          variant: "destructive"
        });
      }
      setLoading(false);
    };

    initAuth();
  }, [toast]);

  const setUserSession = (userData: User) => {
    // Set session expiry to 24 hours
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("sessionExpiry", expiryTime.toString());
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Input validation
      const sanitizedEmail = sanitizeInput(email.toLowerCase());
      
      if (!validateEmail(sanitizedEmail)) {
        throw new Error("Please enter a valid email address");
      }
      
      if (!password) {
        throw new Error("Password is required");
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (simulate database check)
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const existingUser = existingUsers.find((u: any) => u.email === sanitizedEmail);
      
      if (!existingUser) {
        throw new Error("No account found with this email address");
      }
      
      // In a real app, you would hash and compare passwords
      if (existingUser.password !== password) {
        throw new Error("Invalid password");
      }

      if (existingUser.accountStatus === 'suspended') {
        throw new Error("Your account has been suspended. Please contact support.");
      }

      // Create user session
      const userSession: User = {
        id: existingUser.id,
        email: sanitizedEmail,
        name: existingUser.name,
        emailVerified: existingUser.emailVerified || false,
        lastLogin: new Date().toISOString(),
        accountStatus: 'active',
        createdAt: existingUser.createdAt
      };
      
      setUserSession(userSession);
      
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${userSession.name || userSession.email}`,
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
      // Input validation and sanitization
      const sanitizedEmail = sanitizeInput(email.toLowerCase());
      const sanitizedName = name ? sanitizeInput(name) : '';
      
      if (!validateEmail(sanitizedEmail)) {
        throw new Error("Please enter a valid email address");
      }
      
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.message);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const userExists = existingUsers.find((u: any) => u.email === sanitizedEmail);
      
      if (userExists) {
        throw new Error("An account with this email already exists");
      }
      
      // Create new user
      const newUser: User & { password: string } = {
        id: crypto.randomUUID(),
        email: sanitizedEmail,
        name: sanitizedName || sanitizedEmail.split('@')[0],
        password: password, // In production, this would be hashed
        emailVerified: false,
        accountStatus: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Store user in localStorage (simulate database)
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      
      // Create user session (without password)
      const { password: _, ...userSession } = newUser;
      setUserSession(userSession);
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to AI Pro Toolkit Hub! Please verify your email to access all features.",
      });
      
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Registration error",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, emailVerified: true, accountStatus: 'active' as const };
        setUserSession(updatedUser);
        
        // Update in localStorage
        const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const updatedUsers = existingUsers.map((u: any) => 
          u.id === user.id ? { ...u, emailVerified: true, accountStatus: 'active' } : u
        );
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
        
        toast({
          title: "Email verified!",
          description: "Your email has been successfully verified.",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Email verification failed. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Verification email sent",
        description: "Please check your email for the verification link.",
      });
    } catch (error) {
      toast({
        title: "Failed to send verification",
        description: "Please try again later.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const sanitizedEmail = sanitizeInput(email.toLowerCase());
      
      if (!validateEmail(sanitizedEmail)) {
        throw new Error("Please enter a valid email address");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password reset email sent",
        description: "If an account exists with this email, you'll receive reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Reset failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.message);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      toast({
        title: "Password change failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
      throw error;
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
      // Sanitize inputs
      const sanitizedData = { ...userData };
      if (sanitizedData.name) {
        sanitizedData.name = sanitizeInput(sanitizedData.name);
      }
      if (sanitizedData.email) {
        sanitizedData.email = sanitizeInput(sanitizedData.email.toLowerCase());
        if (!validateEmail(sanitizedData.email)) {
          throw new Error("Please enter a valid email address");
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...sanitizedData };
      setUserSession(updatedUser);
      
      // Update in localStorage
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const updatedUsers = existingUsers.map((u: any) => 
        u.id === user.id ? { ...u, ...sanitizedData } : u
      );
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      
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
    localStorage.removeItem("sessionExpiry");
    toast({
      title: "Logged out",
      description: "You have been safely logged out",
    });
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
        verifyEmail,
        resendVerification,
        resetPassword,
        changePassword,
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
