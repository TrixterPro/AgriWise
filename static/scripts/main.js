document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const getLocationBtn = document.getElementById('getLocationBtn');
    const cityInput = document.getElementById('cityInput');
    const stateInput = document.getElementById('stateInput');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const removeImageBtn = document.getElementById('removeImage');
    const promptInput = document.getElementById('promptInput');
    const voiceBtn = document.getElementById('voiceBtn');
    const submitBtn = document.getElementById('submitBtn');
    const resultSection = document.getElementById('resultSection');
    const responseContent = document.getElementById('responseContent');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const speakBtn = document.getElementById('speakBtn');

    let base64Image = null;
    let currentAudio = null; // Store audio object

    // --- 1. Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') html.classList.add('dark');

    // --- 2. Location Intelligence (Nominatim API) ---
    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            getLocationBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating...';
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    
                    cityInput.value = data.address.city || data.address.town || data.address.village || '';
                    stateInput.value = data.address.state || '';
                    getLocationBtn.innerHTML = '<i class="fa-solid fa-check"></i> Located';
                } catch (err) {
                    getLocationBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Auto-Detect';
                }
            }, () => {
                alert("Permission denied or location unavailable.");
                getLocationBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Auto-Detect';
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });

    // --- 3. Image Handling ---
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                base64Image = reader.result;
                imagePreview.src = base64Image;
                imagePreview.classList.remove('hidden');
                uploadPlaceholder.classList.add('hidden');
                removeImageBtn.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    removeImageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        imageInput.value = '';
        base64Image = null;
        imagePreview.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
        removeImageBtn.classList.add('hidden');
    });

    // --- 4. Voice Input (Speech-to-Text) ---
    // Note: This is for INPUT (User speaking to the app)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Default to English, captures Hinglish decently

        voiceBtn.addEventListener('click', () => {
            if (voiceBtn.classList.contains('text-red-500')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });

        recognition.onstart = () => {
            voiceBtn.classList.add('text-red-500', 'animate-pulse');
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('text-red-500', 'animate-pulse');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            promptInput.value += (promptInput.value ? ' ' : '') + transcript;
        };
    } else {
        voiceBtn.style.display = 'none';
    }

    // --- 5. Submit to Backend ---
    submitBtn.addEventListener('click', async () => {
        const text = promptInput.value.trim();
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();

        if (!text && !base64Image) {
            alert("Please enter a question or upload a photo.");
            return;
        }

        // Stop any previous audio playing
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        // UI Loading State
        submitBtn.disabled = true;
        resultSection.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');

        try {
            const response = await fetch('/api/consult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: text,
                    image: base64Image,
                    location: `${city}, ${state}`
                })
            });

            const data = await response.json();

            if (data.success) {
                // --- RENDER MARKDOWN RESPONSE ---
                // Using marked.parse() to convert MD to HTML
                responseContent.innerHTML = marked.parse(data.response);
                
                resultSection.classList.remove('hidden');

                // --- HANDLE AUDIO RESPONSE (TTS) ---
                if (data.audio) {
                    const audioSrc = "data:audio/mp3;base64," + data.audio;
                    currentAudio = new Audio(audioSrc);
                    
                    // Toggle Play/Pause Logic
                    speakBtn.onclick = () => {
                        if (currentAudio.paused) {
                            currentAudio.play();
                            speakBtn.innerHTML = '<i class="fa-solid fa-pause text-lg"></i>';
                        } else {
                            currentAudio.pause();
                            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high text-lg"></i>';
                        }
                    };

                    // Reset icon when audio finishes
                    currentAudio.onended = () => {
                        speakBtn.innerHTML = '<i class="fa-solid fa-volume-high text-lg"></i>';
                    };
                }

            } else {
                alert(data.error || "An error occurred.");
            }

        } catch (error) {
            console.error(error);
            alert("Failed to connect to AgriWise server.");
        } finally {
            loadingIndicator.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });
});