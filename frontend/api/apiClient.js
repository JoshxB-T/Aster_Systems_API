export async function apiRequest(URL, options = {}) {
    try {
        const response = await fetch(`${URL}`, options);
        const json = await response.json();

        return json.data;
    } catch (err) {
        console.error("API request failed: ", err);
        throw err;
    }
}
