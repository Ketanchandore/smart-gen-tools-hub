import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import BarcodeGenerator from "./pages/BarcodeGenerator";
import CreditCardGenerator from "./pages/CreditCardGenerator";
import DateGenerator from "./pages/DateGenerator";
import FakeIdentity from "./pages/FakeIdentity";
import IFSCFinder from "./pages/IFSCFinder";
import ImageCompressor from "./pages/ImageCompressor";
import ImageConverter from "./pages/ImageConverter";
import LoremIpsum from "./pages/LoremIpsum";
import NotFound from "./pages/NotFound";
import NumberPlate from "./pages/NumberPlate";
import PasswordGenerator from "./pages/PasswordGenerator";
import PINLocator from "./pages/PINLocator";
import TextCaseConverter from "./pages/TextCaseConverter";
import TempEmail from "./pages/TempEmail";
import WordToPdf from "./pages/WordToPdf";
import PdfToWord from "./pages/PdfToWord";
import PdfSplitMerge from "./pages/PdfSplitMerge";
import { Toaster } from "./components/ui/toaster";

// New imports for the new tools
// Career tools
import ResumeBuilder from "./pages/ResumeBuilder";
import CoverLetter from "./pages/CoverLetter";
import LinkedInBio from "./pages/LinkedInBio";
import JobMatcher from "./pages/JobMatcher";
import InterviewCoach from "./pages/InterviewCoach";
import ResumeScore from "./pages/ResumeScore";

// Content tools
import BlogWriter from "./pages/BlogWriter";
import BlogRewriter from "./pages/BlogRewriter";
import TwitterThread from "./pages/TwitterThread";
import ContentDetector from "./pages/ContentDetector";
import BlogTopics from "./pages/BlogTopics";
import SmartCopy from "./pages/SmartCopy";
import EmailWriter from "./pages/EmailWriter";
import ProductDescription from "./pages/ProductDescription";
import SocialCaptions from "./pages/SocialCaptions";
import ScriptPresentation from "./pages/ScriptPresentation";
import EmailSequence from "./pages/EmailSequence";
import ArticleSocial from "./pages/ArticleSocial";
import NameGenerator from "./pages/NameGenerator";
import TaglineGenerator from "./pages/TaglineGenerator";
import TestimonialGenerator from "./pages/TestimonialGenerator";

// Multimedia tools
import VideoSummarizer from "./pages/VideoSummarizer";
import YoutubeSummarizer from "./pages/YoutubeSummarizer";
import BlogToCarousel from "./pages/BlogToCarousel";
import BlogToInfographic from "./pages/BlogToInfographic";
import YoutubeShorts from "./pages/YoutubeShorts";
import TextToSpeech from "./pages/TextToSpeech";
import VoiceCloner from "./pages/VoiceCloner";
import AudioEnhancer from "./pages/AudioEnhancer";
import ChatYoutube from "./pages/ChatYoutube";
import YoutubeDescription from "./pages/YoutubeDescription";
import PinterestCreator from "./pages/PinterestCreator";
import TiktokScript from "./pages/TiktokScript";

// Document tools
import ImageToText from "./pages/ImageToText";
import DocumentQA from "./pages/DocumentQA";
import WordCounter from "./pages/WordCounter";

// Coding tools
import CodeGenerator from "./pages/CodeGenerator";
import CodeExplainer from "./pages/CodeExplainer";
import WebsiteAnalyzer from "./pages/WebsiteAnalyzer";
import ChromeExtension from "./pages/ChromeExtension";
import SaasName from "./pages/SaasName";

// Learning tools
import StudyNotes from "./pages/StudyNotes";
import SlideGenerator from "./pages/SlideGenerator";
import ChatWebsite from "./pages/ChatWebsite";
import MindMap from "./pages/MindMap";
import FlashcardGenerator from "./pages/FlashcardGenerator";
import AiTranslator from "./pages/AiTranslator";

// Marketing tools
import BusinessPlan from "./pages/BusinessPlan";
import LeadMagnet from "./pages/LeadMagnet";
import SurveyCreator from "./pages/SurveyCreator";

// Design tools
import ImageGenerator from "./pages/ImageGenerator";
import AvatarGenerator from "./pages/AvatarGenerator";
import ChatImage from "./pages/ChatImage";
import BrandkitOrganizer from "./pages/BrandkitOrganizer";
import ImageEnhancer from "./pages/ImageEnhancer";

// Utilities
import QrCode from "./pages/QrCode";

// Create a client
const queryClient = new QueryClient();

function App() {
  // Handle dark mode 
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  // Set body class for dark/light mode
  document.documentElement.classList.toggle("dark", darkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Outlet /></Layout>}>
            <Route index element={<Index />} />
            
            {/* Existing Tool Routes */}
            <Route path="/barcode-generator" element={<BarcodeGenerator />} />
            <Route path="/credit-card-generator" element={<CreditCardGenerator />} />
            <Route path="/date-generator" element={<DateGenerator />} />
            <Route path="/fake-identity" element={<FakeIdentity />} />
            <Route path="/ifsc-finder" element={<IFSCFinder />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/image-converter" element={<ImageConverter />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/number-plate" element={<NumberPlate />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/pin-locator" element={<PINLocator />} />
            <Route path="/text-case-converter" element={<TextCaseConverter />} />
            <Route path="/temp-email" element={<TempEmail />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/pdf-split-merge" element={<PdfSplitMerge />} />
            
            {/* Career Tool Routes */}
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/linkedin-bio" element={<LinkedInBio />} />
            <Route path="/job-matcher" element={<JobMatcher />} />
            <Route path="/interview-coach" element={<InterviewCoach />} />
            <Route path="/resume-score" element={<ResumeScore />} />
            
            {/* Content Tool Routes */}
            <Route path="/blog-writer" element={<BlogWriter />} />
            <Route path="/blog-rewriter" element={<BlogRewriter />} />
            <Route path="/twitter-thread" element={<TwitterThread />} />
            <Route path="/content-detector" element={<ContentDetector />} />
            <Route path="/blog-topics" element={<BlogTopics />} />
            <Route path="/smart-copy" element={<SmartCopy />} />
            <Route path="/email-writer" element={<EmailWriter />} />
            <Route path="/product-description" element={<ProductDescription />} />
            <Route path="/social-captions" element={<SocialCaptions />} />
            <Route path="/script-presentation" element={<ScriptPresentation />} />
            <Route path="/email-sequence" element={<EmailSequence />} />
            <Route path="/article-social" element={<ArticleSocial />} />
            <Route path="/name-generator" element={<NameGenerator />} />
            <Route path="/tagline-generator" element={<TaglineGenerator />} />
            <Route path="/testimonial-generator" element={<TestimonialGenerator />} />
            
            {/* Multimedia Tool Routes */}
            <Route path="/video-summarizer" element={<VideoSummarizer />} />
            <Route path="/youtube-summarizer" element={<YoutubeSummarizer />} />
            <Route path="/blog-to-carousel" element={<BlogToCarousel />} />
            <Route path="/blog-to-infographic" element={<BlogToInfographic />} />
            <Route path="/youtube-shorts" element={<YoutubeShorts />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/voice-cloner" element={<VoiceCloner />} />
            <Route path="/audio-enhancer" element={<AudioEnhancer />} />
            <Route path="/chat-youtube" element={<ChatYoutube />} />
            <Route path="/youtube-description" element={<YoutubeDescription />} />
            <Route path="/pinterest-creator" element={<PinterestCreator />} />
            <Route path="/tiktok-script" element={<TiktokScript />} />
            
            {/* Document Tool Routes */}
            <Route path="/image-to-text" element={<ImageToText />} />
            <Route path="/document-qa" element={<DocumentQA />} />
            <Route path="/word-counter" element={<WordCounter />} />
            
            {/* Coding Tool Routes */}
            <Route path="/code-generator" element={<CodeGenerator />} />
            <Route path="/code-explainer" element={<CodeExplainer />} />
            <Route path="/website-analyzer" element={<WebsiteAnalyzer />} />
            <Route path="/chrome-extension" element={<ChromeExtension />} />
            <Route path="/saas-name" element={<SaasName />} />
            
            {/* Learning Tool Routes */}
            <Route path="/study-notes" element={<StudyNotes />} />
            <Route path="/slide-generator" element={<SlideGenerator />} />
            <Route path="/chat-website" element={<ChatWebsite />} />
            <Route path="/mind-map" element={<MindMap />} />
            <Route path="/flashcard-generator" element={<FlashcardGenerator />} />
            <Route path="/ai-translator" element={<AiTranslator />} />
            
            {/* Marketing Tool Routes */}
            <Route path="/business-plan" element={<BusinessPlan />} />
            <Route path="/lead-magnet" element={<LeadMagnet />} />
            <Route path="/survey-creator" element={<SurveyCreator />} />
            
            {/* Design Tool Routes */}
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/avatar-generator" element={<AvatarGenerator />} />
            <Route path="/chat-image" element={<ChatImage />} />
            <Route path="/brandkit-organizer" element={<BrandkitOrganizer />} />
            <Route path="/image-enhancer" element={<ImageEnhancer />} />
            
            {/* Utilities Tool Routes */}
            <Route path="/qr-code" element={<QrCode />} />
            
            {/* Redirect all other routes to 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
