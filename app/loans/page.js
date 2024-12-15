"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function FetchLoans() {
  const router = useRouter();
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("loan_name");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/get-loan");
        console.log("Response Data:", response.data);
        setLoans(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Search and filter functionality
  const filteredLoans = loans
    .filter(loan => {
      const matchesSearch = loan.loan_name.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterBy === "all") return matchesSearch;
      return matchesSearch && loan.loan_name.includes(filterBy);
    })
    .sort((a, b) => {
      if (sortBy === "interest_rate") {
        return parseFloat(a.interest_rate) - parseFloat(b.interest_rate);
      }
      return a[sortBy].localeCompare(b[sortBy]);
    });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Loans</h1>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
        <input
          type="text"
          placeholder="Search loans..."
          className="p-2 border rounded-lg w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex gap-4">
          <select 
            className="p-2 border rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="loan_name">Sort by Name</option>
            <option value="interest_rate">Sort by Interest Rate</option>
            <option value="max_amount">Sort by Amount</option>
          </select>

          <select 
            className="p-2 border rounded-lg"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Loans</option>
            <option value="Home">Home Loans</option>
            <option value="Personal">Personal Loans</option>
            <option value="Business">Business Loans</option>
          </select>
        </div>
      </div>

      {filteredLoans.length === 0 ? (
        <p className="text-center text-gray-600">No loans found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
              onClick={() => router.push(`/loans/${loan._id}`)}
            >
              <div className="bg-blue-600 p-4">
                <h2 className="text-xl font-bold text-white">
                  {loan.loan_name}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="border-b pb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Interest Rate</h3>
                  <p className="text-lg font-medium text-gray-800">{loan.interest_rate}</p>
                </div>
                <div className="border-b pb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Maximum Amount</h3>
                  <p className="text-lg font-medium text-gray-800">{loan.max_amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Loan Tenure</h3>
                  <p className="text-lg font-medium text-gray-800">{loan.loan_tenure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
