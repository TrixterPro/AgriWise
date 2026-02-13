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

with open("instructions.txt") as f:
    isntructions_file = f.read()

# 2. Strict System Prompt for Script Matching
SYSTEM_INSTRUCTION = isntructions_file

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

        if not user_text and not image_data:
            return jsonify({"error": "Please provide a question or an image."}), 400

        full_prompt = f"User Location: {location_info}\n\nUser Query: {user_text}"
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
            model="gemini-2.5-flash-lite", # Using the working model
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.4,
            ),
            contents=request_parts
        )
        
        ai_text = response.text

        # 2. Detect Language for TTS (Simple Heuristic or Default)
        # We default to 'en'. If we detect Devanagari characters, we switch to 'hi'.
        # For Hinglish, 'en' (English accent) often reads it better than 'hi' forced on Latin text.
        
        tts_lang = 'en'
        # Check if text contains Devanagari characters (Unicode range)
        if any('\u0900' <= char <= '\u097f' for char in ai_text):
            tts_lang = 'hi' # Use Hindi voice
            
        # 3. Generate High-Quality Audio (gTTS)
        # Clean text for TTS (remove ** bolding markers)
        clean_text = ai_text.replace('*', '')
        
        tts = gTTS(text=clean_text, lang=tts_lang, slow=False)
        
        # Save to memory buffer
        audio_fp = io.BytesIO()
        tts.write_to_fp(audio_fp)
        audio_fp.seek(0)
        
        # Encode audio to Base64
        audio_b64 = base64.b64encode(audio_fp.read()).decode('utf-8')

        return jsonify({
            "response": ai_text,
            "audio": audio_b64, # Send audio data directly
            "success": True
        })

    except Exception as e:
        print(f"Server Error: {str(e)}")
        return jsonify({"error": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)