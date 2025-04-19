// api/get-location.js

// This format works with Vercel serverless functions
export default async function handler(request, response) {
  try {
    // Read the country code from the Vercel-provided header
    const countryCode = request.headers['x-vercel-ip-country'] || 'INTL'; // Fallback if header is missing

    console.log("Vercel Country Code Header:", request.headers['x-vercel-ip-country']); // Log for debugging

    // Set CORS headers for your API route response to allow your frontend
    response.setHeader('Access-Control-Allow-Origin', 'https://dr-fares-rezq.vercel.app');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle potential OPTIONS request from browser preflight
    if (request.method === 'OPTIONS') {
       return response.status(200).end();
    }

    // Send the country code back to your frontend
    // Mimic the structure your frontend expects (e.g., { country_code: 'EG' })
    return response.status(200).json({ country_code: countryCode });

  } catch (error) {
    console.error("Error in /api/get-location:", error);
    // Set CORS headers even on error
    response.setHeader('Access-Control-Allow-Origin', 'https://dr-fares-rezq.vercel.app');
    return response.status(500).json({ error: 'Internal Server Error reading location header' });
  }
}
