<div align="center">

# DecoGen AI
**Transform your room with AI-powered interior design using the FLUX API**

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/downloads/)
[![FLUX API](https://img.shields.io/badge/FLUX_API-000000?style=for-the-badge&logo=artificial-intelligence&logoColor=white)](https://docs.bfl.ai/)


![Room Decorator AI Screenshot](assets/image.png)

*Upload a room photo, choose a style, and watch AI transform your space!*

</div>

---

## ✨ Features

- 🖼️ **Smart Image Upload** - Drag & drop room photos (PNG, JPG, JPEG up to 20MB)
- 🎨 **8 Preset Styles** - From Modern Minimalist to Bohemian, or create custom prompts
- ⚡ **Real-time Processing** - Watch your room transform in real-time
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- 📥 **Instant Download** - Get your decorated room image immediately
- ⚙️ **Flexible Aspect Ratios** - Choose from multiple output formats

---

## 🚀 Quick Start

### 1. Installation

```bash

# Install dependencies
pip install -r requirements.txt
```

### 2. Setup API Key

**For Local Development:**
```toml
# .streamlit/secrets.toml (optional)
BFL_API_KEY = "your_flux_api_key_here"
```

**For Public Deployment:**
- The app will prompt users to enter their own API key
- No setup required - users provide their own keys

> 💡 Get your API key from [Black Forest Labs](https://docs.bfl.ai/)

### 3. Run the App

**Clean, Minimal UI (Recommended):**
```bash
streamlit run streamlit_app_clean.py
```

**Feature-Rich UI:**
```bash
streamlit run streamlit_app.py
```

Open your browser to `http://localhost:8501` and start decorating! 🎉

---

## 🎨 Decoration Styles

<table>
<tr>
<td align="center"><strong>🏢 Modern Minimalist</strong><br><em>Sleek furniture with clean lines</em></td>
<td align="center"><strong>🛋️ Cozy Living</strong><br><em>Warm lighting and comfort</em></td>
<td align="center"><strong>👑 Victorian Elegant</strong><br><em>Ornate details and rich fabrics</em></td>
<td align="center"><strong>💼 Modern Office</strong><br><em>Professional workspace setup</em></td>
</tr>
<tr>
<td align="center"><strong>🌈 Bohemian</strong><br><em>Colorful and artistic vibes</em></td>
<td align="center"><strong>🌲 Scandinavian</strong><br><em>Light wood and minimalism</em></td>
<td align="center"><strong>⚙️ Industrial</strong><br><em>Exposed elements and metal</em></td>
<td align="center"><strong>🏖️ Mediterranean</strong><br><em>Warm colors and rustic charm</em></td>
</tr>
</table>

---

## 🔧 How It Works

1. **📤 Upload** your room photo
2. **🎯 Choose** a decoration style or write custom prompts
3. **⚡ Process** with FLUX.1 Kontext [pro] AI model
4. **📱 Preview** your transformed space
5. **💾 Download** the decorated image

---

## 🎨 Design Philosophy

This app comes in two versions:

### **Clean UI** (`streamlit_app_clean.py`) - *Recommended*
- **Jony Ive-inspired minimalism** - Only essential elements
- **Step-by-step flow** - Upload → Style → Generate  
- **Zero cognitive overload** - One task at a time
- **Elegant simplicity** - Clean typography and subtle animations
- **Centered layout** - Focused, distraction-free design

### **Feature-Rich UI** (`streamlit_app.py`)
- **Advanced options** - Multiple controls and settings
- **Power user features** - Style intensity, quality options
- **Comprehensive feedback** - Detailed metrics and info
- **Sidebar controls** - All options accessible

---

## 📁 Project Structure

```
room-decorator-ai/
├── 🎯 streamlit_app_clean.py    # Clean, minimal UI (recommended)
├── 🎛️ streamlit_app.py          # Feature-rich UI with advanced options
├── 🔧 room_decorator.py         # FLUX API wrapper class
├── 🧪 test_room_decorator.py    # Comprehensive test suite
├── 📋 requirements.txt          # Python dependencies
├── ⚙️ .streamlit/
│   ├── config.toml              # Clean theme configuration
│   └── secrets.toml             # API keys (gitignored)
├── 🖼️ assets/
│   └── image.png                # App screenshot
├── 📚 docs.md                   # Comprehensive documentation
├── 🚫 .gitignore                # Git ignore rules
└── 📖 README.md                 # This file
```

---

## ⚙️ Technical Specifications

| Feature | Specification |
|---------|---------------|
| **AI Model** | FLUX.1 Kontext [pro] |
| **Max File Size** | 20MB |
| **Supported Formats** | PNG, JPG, JPEG |
| **Processing Time** | 30-60 seconds |
| **Aspect Ratios** | 16:9, 4:3, 1:1, 3:4, 9:16 |
| **Concurrent Requests** | Up to 24 |
| **Image Expiration** | 10 minutes |

---

## 🎯 Usage Tips

### 📸 **Best Photo Practices**
- Use well-lit, clear room photos
- Ensure the room is the main focus
- Avoid cluttered or dark images
- Include architectural features for context

### ✍️ **Prompt Writing**
- Be specific about furniture and colors
- Mention lighting preferences
- Include style keywords (modern, vintage, etc.)
- Describe the room's intended use

### 🎨 **Style Combinations**
- Mix styles: "Scandinavian with industrial accents"
- Specify colors: "Add warm earth tones"
- Include textures: "Incorporate natural wood and metal"

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

---
---

## 🙏 Acknowledgments

- **[Black Forest Labs](https://blackforestlabs.ai/)** for the powerful FLUX API
- **[Streamlit](https://streamlit.io/)** for the amazing web framework
- **Community contributors** for feedback and improvements

---

<div align="center">

**Made with ❤️ and AI**


</div>
