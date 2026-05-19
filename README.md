<div align="center">

# DecoGen AI
**Transform your room with AI-powered interior design using FLUX Kontext**

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![FLUX API](https://img.shields.io/badge/FLUX_API-000000?style=for-the-badge&logo=artificial-intelligence&logoColor=white)](https://docs.bfl.ai/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

![DecoGen AI Screenshot](assets/image.png)

*Upload a room photo, choose a style, and let AI reimagine your space in seconds.*

</div>

---

## Overview

DecoGen AI is a web application that transforms room photos into AI-generated interior design concepts. It combines a modern Flask backend, PostgreSQL storage, Cloudinary image hosting, Google OAuth login, multilingual support, and FLUX Kontext image generation. [file:178][file:180][file:138]

The app is built for a smooth user experience with preset styles, custom prompts, aspect ratio selection, before/after comparison, saved designs, reviews, and live project stats. [file:180][file:138][file:181]

---

## Features

- 🖼️ **Room Photo Upload** - Upload PNG, JPG, or JPEG room images.
- 🎨 **40+ Style Presets** - From Scandinavian and Japandi to Moroccan Modern and Cyberpunk.
- ✍️ **Custom Prompts** - Describe any interior style in your own words.
- 🌍 **Multilingual UI** - English, French, and Arabic support.
- ⚡ **Async Generation** - Image generation runs in the background with status polling.
- 🧩 **Before / After View** - Compare the original room and the AI result.
- 💾 **Saved Designs** - Logged-in users can store generated designs.
- 👤 **Google Login** - Authenticate with Google to unlock personal features.
- ⭐ **Reviews System** - Users can leave ratings and comments.
- 📊 **Live Stats** - Displays generated rooms, signed-in users, and latest activity.
- 📱 **Responsive Design** - Works well on desktop and mobile.
- 🔊 **Voice Input** - Optional speech-to-text prompt entry. [file:178][file:180][file:138]

---

## How It Works

1. Upload a room photo.
2. Choose a preset style or write a custom prompt.
3. Pick an aspect ratio.
4. Send the request to FLUX Kontext.
5. Preview the transformed room and save it if you are signed in. [file:178][file:180][file:138]

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Flask |
| AI Model | FLUX Kontext image generation |
| Auth | Google OAuth |
| Database | PostgreSQL |
| Storage | Cloudinary |
| Translation | Google Translator |
| Hosting-ready | Environment-based configuration | [file:178][file:180]

---

## Project Structure

```bash
room-decorator-ai/
├── app.py
├── app-10.py
├── static/
│   ├── style.css
│   ├── main.js
│   └── images/
├── templates/
│   ├── index.html
│   └── designs.html
├── assets/
│   └── image.png
├── requirements.txt
└── README.md
```

---

## Installation

```bash
git clone https://github.com/AAMIR-EDDAOUDI2/DecoGen-AI-2.git
cd DecoGen-AI-2
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file with:

```env
SECRET_KEY=your_secret_key
BFL_API_KEY=your_flux_api_key
DATABASE_URL=your_postgres_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

---

## Run the App

```bash
python app.py
```

Then open:

```bash
http://localhost:5000
```

---

## API Routes

| Route | Method | Description |
|---|---|---|
| `/` | GET | Home page |
| `/decorate-room` | POST | Start image generation |
| `/status/<job_id>` | GET | Check job status |
| `/result/<job_id>` | GET | Download generated result |
| `/before/<job_id>` | GET | View original uploaded image |
| `/auth/login` | GET | Google login |
| `/auth/callback` | GET | OAuth callback |
| `/auth/logout` | GET | Log out |
| `/auth/me` | GET | Current user info |
| `/designs` | GET | Saved designs page |
| `/designs/delete/<id>` | DELETE | Delete a saved design |
| `/submit-review` | POST | Submit a review |
| `/get-reviews` | GET | Fetch reviews |
| `/stats` | GET | App statistics | [file:178][file:180]

---

## Style Presets

The app includes many style prompts such as:

- Scandinavian
- Japandi
- Modern Luxury
- Industrial
- Bohemian
- Moroccan Modern
- Mediterranean
- Futuristic
- Cyberpunk
- Gaming Room
- Nature Inspired
- Hotel Luxury Suite
- Parisian Style
- Smart Home
- Earth Tone Interior
- Soft Girl Aesthetic [file:180][file:138]

---

## Usage Tips

### Best results
- Use a clear, well-lit room photo.
- Keep the room as centered and visible as possible.
- Choose a style that matches the room type.
- Write specific prompts for better results, such as colors, materials, and lighting.

### Prompt examples
- “Scandinavian living room with warm oak, linen sofa, and soft natural light.”
- “Modern luxury bedroom with marble accents, gold details, and ambient lighting.”
- “Moroccan modern interior with geometric tile patterns and warm jewel tones.” [file:138][file:180]



---

## Acknowledgments

- **Black Forest Labs** for FLUX Kontext image generation. [file:180]
- **Google OAuth** for authentication. [file:178]
- **Cloudinary** for image hosting. [file:178]
- **PostgreSQL** for data storage. [file:178]

---

## License

This project was created for educational purposes as a BTS PFE project.

</div>
