// services/api.js

export async function fetchRecommendations(prompt) {
  try {
    const url = `https://wesleygonzales-qloo-hackaton-api.hf.space/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
