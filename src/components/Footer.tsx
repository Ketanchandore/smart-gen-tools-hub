
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Linkedin, Twitter } from 'lucide-react';

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
          
          {/* Social Media Links */}
          <div className="flex items-center justify-center space-x-6 mb-4">
            {/* YouTube Link */}
            <a
              href="https://youtube.com/@user-iy2kz2ur7o?si=yAWjRDIZJ7MJ-k0d"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
              title="Pine Tools Hub YouTube Channel"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-red-600 transition-all duration-300 group"
            >
              <Youtube className="h-7 w-7 transition-transform group-hover:scale-110 text-red-500" />
              <span className="text-base font-medium hidden sm:inline">YouTube</span>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/ketan-chandore-51a533254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with us on LinkedIn"
              title="Pine Tools Hub LinkedIn Profile"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-all duration-300 group"
            >
              <Linkedin className="h-7 w-7 transition-transform group-hover:scale-110 text-blue-600" />
              <span className="text-base font-medium hidden sm:inline">LinkedIn</span>
            </a>

            {/* Twitter Link */}
            <a
              href="https://x.com/pinepl_techai?s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
              title="Pine Tools Hub Twitter Profile"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-sky-500 transition-all duration-300 group"
            >
              <Twitter className="h-7 w-7 transition-transform group-hover:scale-110 text-sky-500" />
              <span className="text-base font-medium hidden sm:inline">Twitter</span>
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
