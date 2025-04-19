// File path: api/get-location.js

/**
 * Vercel Serverless Function to get the user's country code.
 * It reads the 'x-vercel-ip-country' header injected by Vercel.
 * This avoids external API calls, rate limits, and CORS issues with third-party providers.
 */
export default async function handler(request, response) {
    try {
      // 1. Read the country code from the Vercel-provided header.
      // Vercel injects this header automatically based on the request IP.
      // Node.js typically lowercases incoming header names.
      // Provide a fallback ('INTL' for International) if the header is somehow missing
      // (especially during local development `vercel dev` where it won't be present).
      const countryCode = request.headers['x-vercel-ip-country'] || 'INTL';
  
      // Optional: Log the detected country code for debugging purposes (visible in Vercel Function logs)
      console.log(`Detected Vercel Country Code: ${countryCode} (Header value: ${request.headers['x-vercel-ip-country']})`);
  
      // 2. Set CORS headers for the response *from this API route*.
      // This allows your frontend hosted at 'https://dr-fares-rezq.vercel.app'
      // to fetch data from this API route (/api/get-location).
      response.setHeader('Access-Control-Allow-Origin', 'https://dr-fares-rezq.vercel.app'); // Restrict to your frontend's origin
      response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
      // 3. Handle browser CORS preflight requests (OPTIONS method).
      if (request.method === 'OPTIONS') {
        return response.status(200).end();
      }
  
      // 4. Send the country code back to the frontend.
      // Use a JSON format consistent with what the frontend component expects.
      return response.status(200).json({ country_code: countryCode });
  
    } catch (error) {
      // 5. Handle any unexpected errors during execution.
      console.error("Error in /api/get-location function:", error);
  
      // Set CORS headers even on error responses
      response.setHeader('Access-Control-Allow-Origin', 'https://dr-fares-rezq.vercel.app');
  
      // Return a generic server error response
      return response.status(500).json({ error: 'Internal Server Error reading location header' });
    }
  }