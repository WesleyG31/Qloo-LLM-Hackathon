import streamlit as st
import requests

st.set_page_config(page_title="TasteMatch AI Demo", layout="centered")

st.title("🎧 TasteMatch AI - Cultural Recommendation Demo")
st.markdown("Enter your tastes, interests, or plans below. The system will infer your cultural profile and return recommendations powered by OpenRouter + Qloo.")

# API URL (you can update this to the real URL if hosted)
API_URL = "https://wesleygonzales-qloo-hackaton-api.hf.space/"  # Change if deployed



# Input form
with st.form("recommendation_form"):
    prompt = st.text_area("Describe your cultural tastes, preferences, or upcoming plans:", height=150, placeholder="E.g. I love Scandinavian crime novels, Radiohead, and I'm planning a trip to Tokyo.")
    submit = st.form_submit_button("Get Recommendations")

if submit:
    if not prompt.strip():
        st.warning("Please enter a prompt.")
    else:
        with st.spinner("Analyzing your tastes and fetching recommendations..."):
            try:
                response = requests.post(f"{API_URL}/recommend/", json={"prompt": prompt})
                if response.status_code == 200:
                    data = response.json()
                    st.subheader("🧠 Cultural Profile")
                    st.write(data.get("profile"))

                    st.subheader("🎯 Recommendations")
                    for category, items in data.get("recommendations", {}).items():
                        st.markdown(f"**{category.title()}**")
                        for i in items:
                            st.write(f"• {i}")

                    st.subheader("💬 Follow-up Suggestion")
                    st.info(data.get("follow_up_prompt", "Want more recommendations?"))
                else:
                    st.error(f"Error: {response.status_code} - {response.text}")
            except Exception as e:
                st.error(f"Failed to connect to backend API: {e}")

