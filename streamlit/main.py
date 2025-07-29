import streamlit as st
import requests

st.set_page_config(page_title="AI Demo", layout="centered")


#API_URL = "https://wesleygonzales-qloo-hackaton-api.hf.space/" 

API_URL = "http://127.0.0.1:8000"

# Input form
st.title("Recommender")

with st.form("recommendation_form"):
    prompt = st.text_area(
        "Describe your cultural tastes, preferences, or upcoming plans:",
        height=150,
        placeholder="E.g. I want to launch a podcast that blends pop culture analysis with gaming culture for Gen Z listeners in Los Angeles. They spend hours on Twitch, love chaotic meme humor, and play games like Elden Ring and Valorant. They’re also into anime and hyperpop. How should I shape the content and voice?"
    )
    submit = st.form_submit_button("Get Recommendations")

if submit:
    if not prompt.strip():
        st.warning("Please enter a prompt.")
    else:
        with st.spinner("Analyzing your tastes and fetching recommendations..."):
            try:
                response = requests.post(f"{API_URL}/recommend/", json={"prompt": prompt})
                response_json = response.json()

                if response_json.get("error") is True:
                    st.warning(response_json["message"])
                else:
                    st.subheader("Recommendations")
                    st.markdown(response_json["message"])

            except ValueError:
                st.error("Invalid response from the API (not JSON).")
            except Exception as e:
                st.error(f"Failed to connect to backend API:\n{e}")
