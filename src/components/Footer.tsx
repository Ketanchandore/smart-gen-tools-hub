
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border py-8">
      <div className="container px-4">
        <div className="text-center mb-6">
          <p className="text-muted-foreground mb-4">
            <strong>Disclaimer:</strong> All tools are for testing and educational purposes only.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            APIs provided by: Razorpay IFSC API, PostalPIN API, and others.
          </p>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
              Disclaimer
            </Link>
          </div>
          
          {/* YouTube Link */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <a
              href="https://youtube.com/@user-iy2kz2ur7o?si=yAWjRDIZJ7MJ-k0d"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-red-600 transition-colors group"
            >
              <Youtube className="h-7 w-7 transition-transform group-hover:scale-110 text-red-500" />
              <span className="text-base font-medium hidden sm:inline">Visit our YouTube Channel</span>
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pine Tools Hub - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
