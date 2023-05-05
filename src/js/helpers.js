import { TIMEOUT_SEC } from "./models/configs";

/*
* Contains util helper functions to use throughout the entire app.
*/

/**
 * Helper function to set timeout to avoid infinite fetch requests.
 * @param {number} s For the given number of seconds.
 * @returns a new promise timer.
 */
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

/**
 * Generic function for AJAX requests and responses.
 * @param {string} url For the API url.
 * @param {object | undefined} payload For the payload to send.
 * @returns 
 */
export const AJAX = async function (url, payload = undefined) {
    try {

        // Build send object
        const fetchPro = payload ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }) : fetch(url);


        // Fetching promise
        const ajax = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await ajax.json();

        // Throw the api build in error message
        if (!ajax.ok) {
            throw new Error(`${data.message} (${ajax.status})`);
        }

        return data;

    } catch (err) {
        throw err;
    }
}
