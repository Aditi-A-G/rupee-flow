"use client"; // Add this directive to make the component a Client Component

import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const authRoutes = ['/authentication'];

  const shouldHideNavbar = authRoutes.includes(pathname);

  useEffect(() => {
    const scriptId = 'google-translate-script';
    const googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,bn,te,mr,ta,ur,gu,ml,kn,or,pa,as,mai,sa,kok,sd,ne,doi,ks,sat,brx,mni,lus',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,  // We disable automatic display of the widget
          },
          'google_translate_element'
        );
      }
    };

    const addGoogleTranslateScript = () => {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeGoogleTranslateScript = () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) translateElement.innerHTML = '';
    };

    addGoogleTranslateScript();

    return () => {
      removeGoogleTranslateScript();
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

  const handleTranslateClick = () => {
    const googleTranslateElement = document.getElementById('google_translate_element');
    if (googleTranslateElement) {
      googleTranslateElement.style.display = googleTranslateElement.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <html lang="en" className="scroll-p-20 scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Custom Google Translate Button */}
          <button
            onClick={handleTranslateClick}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000,
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '50%',
              padding: '12px 16px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              fontSize: '18px',
              border: 'none',
              transition: 'all 0.3s ease',
              fontWeight: 'bold',
            }}
          >
            🌍
          </button>

          <div
            id="google_translate_element"
            style={{
              display: 'none', // Initially hidden
              position: 'fixed',
              top: '60px',
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

          {!shouldHideNavbar && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
