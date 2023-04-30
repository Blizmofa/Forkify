/*
* helpers.js contains util helper functions to use throughout the entire app
*/

import { TIMEOUT_SEC } from "./models/configs";

// Helper function to set timeout to avoid infinite fetch requests
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// Gets the response from the API server and return its data
export const getJSON = async function (url) {

    try {

        // Fetching promise
        const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await response.json();

        // Throw the api build in error message
        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }

        return data;

    } catch (err) {
        throw err;
    }

}