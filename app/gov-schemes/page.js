"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCheck, FaGifts, FaSpinner, FaSearch, FaBookmark, FaShare, FaDownload } from 'react-icons/fa';

export default function FetchGovSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

  const categories = ['all', 'education', 'health', 'agriculture', 'employment'];

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('bookmarkedSchemes');
    if (savedBookmarks) {
      setBookmarkedSchemes(JSON.parse(savedBookmarks));
    }

    const fetchSchemes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/get-schemes");
        setSchemes(response.data);
        setFilteredSchemes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  useEffect(() => {
    let results = schemes;

    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(scheme => scheme.category === selectedCategory);
    }

    // Show only bookmarked schemes if enabled
    if (showBookmarked) {
      results = results.filter(scheme => bookmarkedSchemes.includes(scheme._id));
    }

    // Apply search filter
    results = results.filter(scheme =>
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredSchemes(results);
  }, [searchTerm, schemes, selectedCategory, showBookmarked, bookmarkedSchemes]);

  const toggleBookmark = (schemeId) => {
    const updatedBookmarks = bookmarkedSchemes.includes(schemeId)
      ? bookmarkedSchemes.filter(id => id !== schemeId)
      : [...bookmarkedSchemes, schemeId];

    setBookmarkedSchemes(updatedBookmarks);
    localStorage.setItem('bookmarkedSchemes', JSON.stringify(updatedBookmarks));
  };

  const shareScheme = async (scheme) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: scheme.name,
          text: scheme.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const downloadSchemeDetails = (scheme) => {
    const schemeText = `
      Scheme Name: ${scheme.name}
      Description: ${scheme.description}
      Eligibility: ${scheme.eligibility}
      Benefits: ${scheme.benefits}
    `;

    const blob = new Blob([schemeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.name.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FaSpinner className="animate-spin text-4xl text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
      <p className="font-semibold">Error: {error}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Government Schemes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Explore available government schemes and their benefits. Find out if you're eligible and how these programs can help you.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showBookmarked ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            <FaBookmark className="inline mr-2" />
            Bookmarked Schemes
          </button>

          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredSchemes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No matching schemes found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredSchemes.map((scheme) => (
            <div key={scheme._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                <h2 className="text-xl font-semibold text-white">{scheme.name}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{scheme.description}</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <FaUserCheck className="text-blue-600 text-xl mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Eligibility Criteria</h3>
                      <p className="text-gray-600">{scheme.eligibility}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaGifts className="text-blue-600 text-xl mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Benefits</h3>
                      <p className="text-gray-600">{scheme.benefits}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                  <button
                    onClick={() => toggleBookmark(scheme._id)}
                    className={`p-2 rounded-full transition-colors ${
                      bookmarkedSchemes.includes(scheme._id) ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <FaBookmark />
                  </button>
                  <button
                    onClick={() => shareScheme(scheme)}
                    className="p-2 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <FaShare />
                  </button>
                  <button
                    onClick={() => downloadSchemeDetails(scheme)}
                    className="p-2 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
