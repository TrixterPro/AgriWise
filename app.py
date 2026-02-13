import os
import json
import base64
import io
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai
from google.genai import types
from gtts import gTTS

# 1. Load Environment Variables
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("Error: GEMINI_API_KEY is missing in .env file")

app = Flask(__name__)
client = genai.Client(api_key=API_KEY)

# 2. Language Mapping for TTS (Frontend Code -> gTTS Code)
LANG_MAP = {
    'en-US': 'en',
    'hi-IN': 'hi',
    'te-IN': 'te', # Telugu
    'ml-IN': 'ml', # Malayalam
    'mr-IN': 'mr', # Marathi
    'bn-IN': 'bn'  # Bengali
}

with open("instructions.txt") as f:
    instructions= f.read()

# 3. System Prompt - Updated for Regional Languages
SYSTEM_INSTRUCTION = instructions

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/consult', methods=['POST'])
def consult_agronomist():
    try:
        data = request.json
        user_text = data.get('query', '')
        image_data = data.get('image', None)
        location_info = data.get('location', 'Unknown Location')
        user_lang_code = data.get('language', 'en-US') # Get selected language

        if not user_text and not image_data:
            return jsonify({"error": "Please provide a question or an image."}), 400

        full_prompt = f"User Location: {location_info}\nUser Language Code: {user_lang_code}\n\nUser Query: {user_text}"
        request_parts = [full_prompt]

        # Handle Image
        if image_data:
            if "," in image_data:
                header, encoded = image_data.split(",", 1)
            else:
                encoded = image_data
            image_bytes = base64.b64decode(encoded)
            image_part = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")
            request_parts.append(image_part)

        # 1. Generate AI Text Response
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite", 
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.4,
            ),
            contents=request_parts
        )
        
        ai_text = response.text

        # 2. Determine TTS Language
        # We prefer the user's selected language setting for the voice accent/engine
        tts_lang = LANG_MAP.get(user_lang_code, 'en')
        
        # Special check: If user selected Hinglish (en-US) but output has Devanagari, switch to Hindi
        if tts_lang == 'en' and any('\u0900' <= char <= '\u097f' for char in ai_text):
            tts_lang = 'hi'

        # 3. Generate Audio (gTTS)
        clean_text = ai_text.replace('*', '').replace('#', '') # Remove MD symbols for smoother speech
        
        try:
            tts = gTTS(text=clean_text, lang=tts_lang, slow=False)
            audio_fp = io.BytesIO()
            tts.write_to_fp(audio_fp)
            audio_fp.seek(0)
            audio_b64 = base64.b64encode(audio_fp.read()).decode('utf-8')
        except Exception as e:
            print(f"TTS Error: {e}")
            audio_b64 = None # Fallback if language not supported by gTTS (rare)

        return jsonify({
            "response": ai_text,
            "audio": audio_b64,
            "success": True
        })

    except Exception as e:
        print(f"Server Error: {str(e)}")
        return jsonify({"error": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)