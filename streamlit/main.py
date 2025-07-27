import streamlit as st
import requests

st.set_page_config(page_title="AI Demo", layout="centered")

# API URL (you can update this to the real URL if hosted)
#API_URL = "https://wesleygonzales-qloo-hackaton-api.hf.space/" 

API_URL = "http://127.0.0.1:8000"

# Input form
st.title("Recommender")

with st.form("recommendation_form"):
    prompt = st.text_area(
        "Describe your cultural tastes, preferences, or upcoming plans:",
        height=150,
        placeholder="E.g. I love Scandinavian crime novels, Radiohead, and I'm planning a trip to Tokyo."
    )
    submit = st.form_submit_button("Get Recommendations")

if submit:
    if not prompt.strip():
        st.warning("Please enter a prompt.")
    else:
        with st.spinner("Analyzing your tastes and fetching recommendations..."):
            try:
                response = requests.post(f"{API_URL}/recommend", json={"prompt": prompt})
                if response.status_code == 200:
                    result = response.text.strip('"')  # en caso de que venga como string con comillas
                    st.subheader("Recommendations")
                    st.write(result)
                else:
                    st.error(f"Error {response.status_code}: {response.text}")
            except Exception as e:
                st.error(f"Failed to connect to backend API:\n{e}")

