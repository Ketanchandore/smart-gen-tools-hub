
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Linkedin, Twitter, Mail, FileText, Briefcase, Zap, Palette, Code } from 'lucide-react';

const Footer = () => {
  const toolCategories = [
    {
      name: 'Career Tools',
      icon: <Briefcase className="h-4 w-4" />,
      links: [
        { name: 'Resume Builder', path: '/resume-builder' },
        { name: 'Cover Letter', path: '/cover-letter' },
        { name: 'LinkedIn Optimizer', path: '/linkedin-bio' },
        { name: 'Interview Coach', path: '/interview-coach' },
      ]
    },
    {
      name: 'Content Tools',
      icon: <FileText className="h-4 w-4" />,
      links: [
        { name: 'Blog Writer', path: '/blog-writer' },
        { name: 'Social Captions', path: '/social-captions' },
        { name: 'Email Writer', path: '/email-writer' },
        { name: 'Twitter Thread', path: '/twitter-thread' },
      ]
    },
    {
      name: 'Utility Tools',
      icon: <Zap className="h-4 w-4" />,
      links: [
        { name: 'Password Generator', path: '/password-generator' },
        { name: 'QR Code', path: '/qr-code' },
        { name: 'Word Counter', path: '/word-counter' },
        { name: 'Text Converter', path: '/text-case-converter' },
      ]
    },
    {
      name: 'Design Tools',
      icon: <Palette className="h-4 w-4" />,
      links: [
        { name: 'Image Generator', path: '/image-generator' },
        { name: 'Avatar Generator', path: '/avatar-generator' },
        { name: 'Image Enhancer', path: '/image-enhancer' },
        { name: 'Image Compressor', path: '/image-compressor' },
      ]
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-background to-muted/20 border-t border-border">
      {/* Main Footer Content */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              PineToolsHub
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free AI-powered tools for productivity and creativity. 90+ tools, no registration, instant results.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://youtube.com/@user-iy2kz2ur7o?si=yAWjRDIZJ7MJ-k0d"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ketan-chandore-51a533254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/pinepl_techai?s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-sky-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tool Categories */}
          {toolCategories.map((category) => (
            <div key={category.name}>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                {category.icon}
                <span>{category.name}</span>
              </h4>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms-conditions" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PineToolsHub. All rights reserved.
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-4 text-center">
            All tools are for testing and educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
