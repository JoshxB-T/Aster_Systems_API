export async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(`${url}`, options);

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        return await response.json();
    } catch (err) {
        console.error("API request failed: ", err);
        throw err;
    }
}
