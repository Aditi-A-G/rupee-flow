<<<<<<< HEAD
'use client';
=======
"use client"; // Add this directive to make the component a Client Component

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation"; // Import usePathname
>>>>>>> 0273bc7af9b8b17aee779f6750f3d12b5dbe8cb5

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

<<<<<<< HEAD
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const authRoutes = ['/authentication'];
  const shouldHideNavbar = authRoutes.includes(pathname);

  const googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de,hi,zh-CN,kn',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    }
  };

  useEffect(() => {
    const scriptId = 'google-translate-script';

    const addScript = () => {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeScript = () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) translateElement.innerHTML = '';
    };

    addScript();

    return () => {
      removeScript();
    };
  }, []);

  useEffect(() => {
    const tidioScript = document.createElement('script');
    tidioScript.src = 'https://code.tidio.co/o6tifxnisrn1uxiqbpa8xfppzvpqnd6q.js';
    tidioScript.async = true;
    tidioScript.onload = () => console.log('Tidio chatbot initialized!');
    document.body.appendChild(tidioScript);

    return () => {
      const script = document.querySelector('script[src="https://code.tidio.co/o6tifxnisrn1uxiqbpa8xfppzvpqnd6q.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

=======
export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide the Navbar on authentication routes
  const authRoutes = ["/authentication"]; // Add your authentication routes here
  const shouldHideNavbar = authRoutes.includes(pathname);

>>>>>>> 0273bc7af9b8b17aee779f6750f3d12b5dbe8cb5
  return (
    <html lang="en" className="scroll-p-20 scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
<<<<<<< HEAD
          <div
            id="google_translate_element"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 12px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
          />
=======
>>>>>>> 0273bc7af9b8b17aee779f6750f3d12b5dbe8cb5
          {!shouldHideNavbar && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
