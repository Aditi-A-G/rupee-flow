// app/api/get-loan/[id]/route.js
import dbConnect from "@/lib/dbConnect";
import Loan from "@/model/loan";

export async function GET(request, { params }) {
    try {
        console.log("Attempting database connection...");
        await dbConnect();
        
        const { id } = params;
        console.log("Attempting to fetch loan with ID:", id);
        
        const loan = await Loan.findById(id);
        
        if (!loan) {
            console.log("No loan found with ID:", id);
            return new Response(
                JSON.stringify({ error: 'Loan not found' }), 
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        console.log("Loan fetched successfully");
        return Response.json(loan, {
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        console.error("Error details:", error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch loan', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
