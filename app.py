import streamlit as st
import os
import io
import glob
from PIL import Image
from io import BytesIO
import requests
from room_decorator import RoomDecoratorApp
from datetime import datetime

st.set_page_config(
    page_title="DecoGen AI",
    page_icon="🏠",
    layout="centered",
    initial_sidebar_state="collapsed"
)

st.markdown("""
<style>
    .main > div { padding-top: 2rem; max-width: 1000px; }
    .stApp > header { background-color: transparent; }
    .stButton > button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white; border: none; border-radius: 25px;
        padding: 0.75rem 2rem; font-weight: 500;
        letter-spacing: 0.5px; transition: all 0.3s ease;
    }
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .stPills button { border-radius: 25px !important; padding: 0.75rem 1.5rem !important; }
    .stPills button[data-selected="true"] {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important; border-color: #667eea !important;
    }
    h1 { font-weight: 300; font-size: 3rem; text-align: center; color: #2c3e50; }
    .subtitle { text-align: center; font-size: 1.2rem; color: #7f8c8d; margin-bottom: 3rem; font-weight: 300; }
</style>
""", unsafe_allow_html=True)

# Session state
if 'processed_image' not in st.session_state:
    st.session_state.processed_image = None
if 'selected_style' not in st.session_state:
    st.session_state.selected_style = None
if 'image_bytes' not in st.session_state:
    st.session_state.image_bytes = None


def initialize_app():
    # Try secrets first, then environment variable
    api_key = None
    try:
        api_key = st.secrets.get("BFL_API_KEY")
    except:
        pass
    if not api_key:
        api_key = os.getenv("BFL_API_KEY")

    if api_key and api_key != "your_flux_api_key_here":
        return RoomDecoratorApp(api_key)

    st.info("🔑 **API Key Required** - Get yours from [Black Forest Labs](https://docs.bfl.ai/)")
    user_api_key = st.text_input(
        "API Key", type="password",
        placeholder="Enter your FLUX API key...",
        label_visibility="collapsed"
    )
    if user_api_key:
        return RoomDecoratorApp(user_api_key)
    return None


def get_styles():
    return {
        "🏢 Modern": "Add modern minimalist furniture with clean lines and neutral colors",
        "🛋️ Cozy": "Create a warm, cozy living space with soft textures and warm lighting",
        "💼 Office": "Transform into a professional workspace with desk and storage",
        "🌿 Natural": "Add natural elements with plants and wooden furniture",
        "🎨 Creative": "Design an artistic space with bold colors and unique furniture"
    }


def main():
    st.markdown("<h1>Room Decorator AI</h1>", unsafe_allow_html=True)
    st.markdown('<p class="subtitle">Transform your space with artificial intelligence</p>', unsafe_allow_html=True)

    # Sidebar history
    if st.sidebar.button("🖼️ Show Image History"):
        st.markdown("## Image History Gallery")
        if os.path.exists("history"):
            images = sorted(glob.glob("history/*.jpg")) + sorted(glob.glob("history/*.png"))
            if not images:
                st.info("No images saved yet.")
            for img_path in images:
                st.image(img_path, caption=os.path.basename(img_path), use_container_width=True)
        else:
            st.info("No history folder found.")
        st.stop()

    decorator_app = initialize_app()
    if not decorator_app:
        return

    st.markdown("### Upload Your Room")
    uploaded_file = st.file_uploader(
        "Choose an image", type=['png', 'jpg', 'jpeg'],
        help="Upload a clear photo of your room",
        label_visibility="collapsed"
    )

    if uploaded_file:
        image_bytes = uploaded_file.read()
        st.session_state.image_bytes = image_bytes

        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            image = Image.open(BytesIO(image_bytes))
            st.image(image, use_container_width=True, caption="Your room")

        st.markdown("---")
        st.markdown("### 🎨 Choose Your Style")
        styles = get_styles()
        selected_style = st.pills(
            "Style options", options=list(styles.keys()),
            selection_mode="single", label_visibility="collapsed"
        )
        if selected_style:
            st.session_state.selected_style = styles[selected_style]

        if st.checkbox("Custom style", value=False):
            custom_prompt = st.text_area(
                "Describe your ideal room style",
                placeholder="E.g., Scandinavian style with light wood and plants...",
                height=100, label_visibility="collapsed"
            )
            if custom_prompt.strip():
                st.session_state.selected_style = custom_prompt

        if st.session_state.selected_style:
            st.markdown("---")
            st.markdown("### Generate")
            aspect_ratio = st.selectbox(
                "Aspect Ratio", ["16:9", "4:3", "1:1"],
                index=0, label_visibility="collapsed"
            )
            if st.button("✨ Transform Room", type="primary", use_container_width=True):
                with st.spinner("Creating your perfect room..."):
                    try:
                        result_url = decorator_app.decorate_room(
                            room_image_bytes=st.session_state.image_bytes,
                            decoration_prompt=st.session_state.selected_style,
                            aspect_ratio=aspect_ratio
                        )
                        response = requests.get(result_url, timeout=60)
                        response.raise_for_status()
                        processed_image = Image.open(BytesIO(response.content))
                        st.session_state.processed_image = processed_image

                        if not os.path.exists("history"):
                            os.makedirs("history")
                        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                        processed_image.save(f"history/{timestamp}_transformed_room.jpg")

                        st.balloons()
                        st.rerun()
                    except Exception as e:
                        st.error(f"Something went wrong: {str(e)}")

    if st.session_state.processed_image:
        st.markdown("---")
        st.markdown("### Your Transformed Room")
        col1, col2 = st.columns(2, gap="large")
        with col1:
            st.markdown("**Before**")
            if st.session_state.image_bytes:
                # ✅ Fixed: reopen from bytes, not from file pointer
                st.image(Image.open(BytesIO(st.session_state.image_bytes)), use_container_width=True)
        with col2:
            st.markdown("**After**")
            st.image(st.session_state.processed_image, use_container_width=True)

        st.markdown("---")
        col1, col2, col3 = st.columns([1, 1, 1])
        with col2:
            img_bytes = io.BytesIO()
            st.session_state.processed_image.save(img_bytes, format='JPEG')
            img_bytes.seek(0)
            st.download_button(
                label="Save Image", data=img_bytes,
                file_name="transformed_room.jpg",
                mime="image/jpeg", use_container_width=True
            )

    st.markdown("---")
    st.markdown(
        "<div style='text-align: center; padding: 2rem; color: #95a5a6;'>"
        "Built by <a href='https://www.linkedin.com/in/aamir-eddaoudi-975222332' "
        "target='_blank' style='color: #667eea; text-decoration: none;'>Aamir EDDAOUDI</a>"
        "</div>",
        unsafe_allow_html=True
    )


if __name__ == "__main__":
    main()
