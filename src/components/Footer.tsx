
import React from 'react';
import { Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border py-6">
      <div className="container px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            <strong>Disclaimer:</strong> All tools are for testing and educational purposes only.
          </p>
          <p className="text-sm text-muted-foreground">
            APIs provided by: Razorpay IFSC API, PostalPIN API, and others.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-3">
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
          <p className="text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} Pine Tools Hub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

