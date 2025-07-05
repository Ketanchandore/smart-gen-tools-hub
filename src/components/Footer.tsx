
import React from 'react';
import { Youtube, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="container px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Smart Gen Tools Hub</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered tools for enhanced productivity and creativity. 
              Free, fast, and accessible to everyone.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://youtube.com/@user-iy2kz2ur7o?si=yAWjRDIZJ7MJ-k0d"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our YouTube channel"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-red-600 transition-colors group"
              >
                <Youtube className="h-6 w-6 transition-transform group-hover:scale-110 text-red-500" />
              </a>
              <a
                href="https://twitter.com/smartgentoolshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-muted-foreground hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/smartgentoolshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Like us on Facebook"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog & Tutorials
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/resume-builder')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pdf-to-word')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  PDF to Word
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/social-captions')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Social Media Captions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/qr-code')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  QR Code Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@smartgentoolshub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@smartgentoolshub.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground mb-2">
              <strong>Disclaimer:</strong> All tools are for testing and educational purposes only.
            </p>
            <p className="text-sm text-muted-foreground">
              APIs provided by: Razorpay IFSC API, PostalPIN API, and others.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-muted-foreground">
              © {new Date().getFullYear()} Pineapple Technologies
            </span>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => navigate('/about')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => navigate('/terms')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => navigate('/contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
