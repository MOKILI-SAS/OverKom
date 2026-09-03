import serverless from 'serverless-http';
import { app } from '../../backend/dist/app.js';

export const handler = serverless(app, {
  request: (request, event, context) => {
    const rawPath = event.path || '';
    // Si Netlify passe le chemin interne, on le nettoie pour Express
    if (rawPath.startsWith('/.netlify/functions/api')) {
      request.url = rawPath.replace('/.netlify/functions/api', '/api') + (event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : '');
    }
  }
});
