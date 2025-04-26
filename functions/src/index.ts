/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getPokemons = onRequest(async (request, response) => {
    logger.info('Hello logs!', { structuredData: true });
    response.set('Content-Type', 'application/json');
    const { limit, offset } = request.query;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit || 20}&offset=${offset || 0}`;
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();
    response.send(JSON.stringify(data));
});
