/* export async function fetchRecommendations(prompt) {
  try {
    const response = await fetch(
      "https://wesleygonzales-qloo-hackaton-api.hf.space/recommend/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}
 */

// api.js
export async function fetchRecommendations(prompt) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/recommend/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    if (data.error) {
      return { error: true, message: data.message };
    }
    return { error: false, message: data.message };
  } catch (error) {
    return { error: true, message: error.message || "Unknown error" };
  }
}
