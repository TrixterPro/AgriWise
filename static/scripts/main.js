document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
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
    const languageSelect = document.getElementById('languageSelect');

    let base64Image = null;
    let currentAudio = null;

    // --- 0. Browser Compatibility Check ---
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isOpera = /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);

    if (isOpera || (!isChrome && navigator.userAgent.indexOf("Safari") === -1)) {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg z-50 flex items-center gap-3 w-11/12 max-w-md';
        warningDiv.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation text-xl"></i>
            <div>
                <p class="font-bold">Browser Compatibility</p>
                <p class="text-sm">Voice features are optimized for <strong>Google Chrome</strong>.</p>
            </div>
            <button onclick="this.parentElement.remove()" class="ml-auto text-yellow-700 hover:text-yellow-900"><i class="fa-solid fa-xmark"></i></button>
        `;
        document.body.appendChild(warningDiv);
    }

    // --- 1. Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') html.classList.add('dark');

    // --- 2. Location Intelligence ---
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

    // --- 4. Voice Input (Dynamic Language) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            if (voiceBtn.classList.contains('text-red-500')) {
                recognition.stop();
            } else {
                // Update language based on dropdown just before starting
                recognition.lang = languageSelect.value;
                try {
                    recognition.start();
                } catch (err) {
                    console.error("Mic start error:", err);
                    alert("Could not start microphone.");
                }
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

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            voiceBtn.classList.remove('text-red-500', 'animate-pulse');
            if (event.error === 'not-allowed') {
                alert("Microphone access denied.");
            }
        };

    } else {
        voiceBtn.style.display = 'none';
        console.warn("Web Speech API not supported.");
    }

    // --- 5. Submit to Backend ---
    submitBtn.addEventListener('click', async () => {
        const text = promptInput.value.trim();
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        const language = languageSelect.value; // Get selected language

        if (!text && !base64Image) {
            alert("Please enter a question or upload a photo.");
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

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
                    location: `${city}, ${state}`,
                    language: language // Send language to backend
                })
            });

            const data = await response.json();

            if (data.success) {
                responseContent.innerHTML = marked.parse(data.response);
                resultSection.classList.remove('hidden');

                if (data.audio) {
                    const audioSrc = "data:audio/mp3;base64," + data.audio;
                    currentAudio = new Audio(audioSrc);
                    
                    speakBtn.onclick = () => {
                        if (currentAudio.paused) {
                            currentAudio.play();
                            speakBtn.innerHTML = '<i class="fa-solid fa-pause text-lg"></i>';
                        } else {
                            currentAudio.pause();
                            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high text-lg"></i>';
                        }
                    };

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