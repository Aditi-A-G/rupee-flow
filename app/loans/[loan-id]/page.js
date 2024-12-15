"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function SingleLoanView({ params }) {
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      if (!params?.["loan-id"]) {
        setError("No loan ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`/api/get-loan/${params["loan-id"]}`);
        setLoan(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoan();
  }, [params]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  if (!loan) return <div className="text-center p-4">No loan data found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">{loan.loan_name}</h1>
        <p className="text-lg opacity-90">Reference ID: {loan._id}</p>
      </div>

      {/* Key Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Interest Rate", value: loan.interest_rate, icon: "💰" },
          { title: "Maximum Amount", value: loan.max_amount, icon: "💵" },
          { title: "Loan Tenure", value: loan.loan_tenure, icon: "⏱" },
          { title: "Processing Fee", value: loan.processing_fee, icon: "📝" }
        ].map((detail, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl mb-3">{detail.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{detail.title}</h2>
            <p className="text-blue-600 font-medium">{detail.value}</p>
          </div>
        ))}
      </div>

      {/* Eligibility Section */}
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">✅</span> Eligibility Criteria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Age", value: loan.eligibility.age },
            { title: "Income", value: loan.eligibility.income },
            { title: "Work Experience", value: loan.eligibility.work_experience },
            { title: "Credit Score", value: loan.eligibility.credit_score }
          ].map((criteria, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">{criteria.title}</h3>
              <p className="text-blue-600">{criteria.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents and Features Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { 
            title: "Required Documents", 
            icon: "📄",
            items: loan.documents_required 
          },
          { 
            title: "Repayment Options", 
            icon: "💳",
            items: loan.repayment_options 
          },
          { 
            title: "Special Features", 
            icon: "⭐",
            items: loan.special_features 
          }
        ].map((section, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">{section.icon}</span> {section.title}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Timestamp */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Last Updated: {new Date(loan.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
