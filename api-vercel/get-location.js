// Vercel serverless function for geolocation
export default function handler(request, response) {
  try {
    // Read the country code from the Vercel-provided header
    const countryCode = request.headers['x-vercel-ip-country'] || 'INTL'; // Fallback if header is missing

    console.log("Vercel Country Code Header:", request.headers['x-vercel-ip-country']); // Log for debugging

    // Set CORS headers for your API route response
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle potential OPTIONS request from browser preflight
    if (request.method === 'OPTIONS') {
       return response.status(200).end();
    }

    // Send the country code back to your frontend
    return response.status(200).json({ country_code: countryCode });

  } catch (error) {
    console.error("Error in /api/get-location:", error);
    // Set CORS headers even on error
    response.setHeader('Access-Control-Allow-Origin', '*');
    return response.status(500).json({ error: 'Internal Server Error reading location header' });
  }
}
