export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers }
  }

  // Always return 404 or a flag saying "use local defaults" so the frontend 
  // gracefully uses its local storage and hardcoded defaults without parsing HTML.
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: false, message: 'Use frontend defaults/local storage' })
  }
}
