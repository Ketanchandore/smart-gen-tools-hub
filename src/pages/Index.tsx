import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import ToolGrid from '@/components/ToolGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Index = () => {
  // Popular tools for the homepage (optimized list)
  const popularTools = [
    {
      name: 'Merge PDF',
      description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
      path: '/merge-pdf',
      icon: LucideIcons.FileText,
      category: 'pdf',
      popular: true
    },
    {
      name: 'Split PDF',
      description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
      path: '/split-pdf',
      icon: LucideIcons.Scissors,
      category: 'pdf',
      popular: true
    },
    {
      name: 'Compress PDF',
      description: 'Reduce file size while optimizing for maximal PDF quality.',
      path: '/compress-pdf',
      icon: LucideIcons.Minimize,
      category: 'pdf',
      popular: true
    },
    {
      name: 'PDF to Word',
      description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.',
      path: '/pdf-to-word',
      icon: LucideIcons.FileText,
      category: 'pdf',
      popular: true
    },
    {
      name: 'Word to PDF',
      description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
      path: '/word-to-pdf',
      icon: LucideIcons.FileUp,
      category: 'pdf',
      popular: true
    },
    {
      name: 'Excel to PDF',
      description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
      path: '/excel-to-pdf',
      icon: LucideIcons.FileSpreadsheet,
      category: 'pdf',
      popular: true
    },
    {
      name: 'PowerPoint to PDF',
      description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
      path: '/powerpoint-to-pdf',
      icon: LucideIcons.Presentation,
      category: 'pdf',
      popular: true
    },
    {
      name: 'JPG to PDF',
      description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
      path: '/jpg-to-pdf',
      icon: LucideIcons.Image,
      category: 'pdf',
      popular: true
    },
    {
      name: 'Edit PDF',
      description: 'Add text, images, shapes or freehand annotations to a PDF document.',
      path: '/edit-pdf',
      icon: LucideIcons.Edit,
      category: 'pdf',
      new: true
    },
    {
      name: 'Sign PDF',
      description: 'Sign yourself or request electronic signatures from others.',
      path: '/sign-pdf',
      icon: LucideIcons.Signature,
      category: 'pdf',
      popular: true
    },
    {
      name: 'Watermark PDF',
      description: 'Stamp an image or text over your PDF in seconds.',
      path: '/watermark-pdf',
      icon: LucideIcons.Droplets,
      category: 'pdf'
    },
    {
      name: 'Rotate PDF',
      description: 'Rotate your PDFs the way you need them.',
      path: '/rotate-pdf',
      icon: LucideIcons.RotateCcw,
      category: 'pdf'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"></div>
        <motion.div 
          className="relative container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Every Tool You Need in One Place
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            100% FREE and easy to use! Merge, split, compress, convert PDFs. AI-powered tools, calculators, and much more.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-background via-muted/20 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pine Tools Hub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fast, reliable, and completely free tools designed for modern productivity
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Optimized for speed and performance with modern architecture</p>
            </motion.div>
            <motion.div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your data stays safe with client-side processing</p>
            </motion.div>
            <motion.div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/20 dark:to-purple-950/30 border border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Clock className="h-12 w-12 text-violet-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Always Available</h3>
              <p className="text-muted-foreground">24/7 access to all tools with zero downtime</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tools Grid */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tools</h2>
            <p className="text-xl text-muted-foreground">
              Our most used and loved tools - 100% free and easy to use
            </p>
          </motion.div>
          <ToolGrid tools={popularTools} />
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
              View All Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;