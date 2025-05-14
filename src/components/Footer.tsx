
import React from 'react';

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
          <p className="text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} Smart Generator Tools Hub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
