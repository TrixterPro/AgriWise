// --- TRANSLATION DICTIONARY ---
const translations = {
    "en-US": {
        subtitle: "Farmer Advisory System",
        heroTitle: "Smart Farming, Simplified.",
        heroDesc: "Upload a photo or describe your crop issue. Our AI Agronomist provides instant, localized solutions.",
        btnLocation: "Auto-Detect Location",
        phCity: "City",
        phState: "State/Region",
        uploadText: "Click to upload crop photo",
        phPrompt: "Describe the issue (e.g., 'Yellow spots on leaves')...",
        btnSubmit: "Diagnose Crop",
        loadingTitle: "Analyzing Field Data...",
        loadingDesc: "Consulting AI Agronomist",
        resultTitle: "Diagnosis Report",
        footerText: "Made with ❤️ for Farmers"
    },
    "hi-IN": {
        subtitle: "किसान सलाहकार प्रणाली",
        heroTitle: "स्मार्ट खेती, अब आसान।",
        heroDesc: "अपनी फसल की समस्या का फोटो अपलोड करें या वर्णन करें। हमारा AI एग्रोनोमिस्ट तुरंत समाधान देगा।",
        btnLocation: "स्थान का पता लगाएं",
        phCity: "शहर",
        phState: "राज्य",
        uploadText: "फसल की फोटो अपलोड करें",
        phPrompt: "समस्या का वर्णन करें (जैसे, 'पत्तों पर पीले धब्बे')...",
        btnSubmit: "फसल निदान करें",
        loadingTitle: "खेत डेटा का विश्लेषण...",
        loadingDesc: "AI एग्रोनोमिस्ट से परामर्श कर रहे हैं",
        resultTitle: "निदान रिपोर्ट",
        footerText: "किसानों के लिए ❤️ के साथ बनाया गया"
    },
    "te-IN": {
        subtitle: "రైతు సలహా వ్యవస్థ",
        heroTitle: "స్మార్ట్ ఫార్మింగ్, సులభం.",
        heroDesc: "మీ పంట సమస్య ఫోటోను అప్‌లోడ్ చేయండి. మా AI వ్యవసాయ నిపుణుడు తక్షణ పరిష్కారాలను అందిస్తారు.",
        btnLocation: "ప్రాంతాన్ని గుర్తించండి",
        phCity: "నగరం",
        phState: "రాష్ట్రం",
        uploadText: "పంట ఫోటోను అప్‌లోడ్ చేయండి",
        phPrompt: "సమస్యను వివరించండి (ఉదా. 'ఆకులపై పసుపు మచ్చలు')...",
        btnSubmit: "పంటను నిర్ధారించండి",
        loadingTitle: "డేటాను విశ్లేషిస్తోంది...",
        loadingDesc: "AI నిపుణుడిని సంప్రదిస్తోంది",
        resultTitle: "నిర్ధారణ నివేదిక",
        footerText: "రైతుల కోసం ❤️ తో రూపొందించబడింది"
    },
    "ml-IN": {
        subtitle: "കർഷക ഉപദേശക സംവിധാനം",
        heroTitle: "സ്മാർട്ട് ഫാമിംഗ്, ലളിതമായി.",
        heroDesc: "വിളകളുടെ പ്രശ്നം വിവരിക്കുക. ഞങ്ങളുടെ AI അഗ്രോണമിസ്റ്റ് പരിഹാരങ്ങൾ നൽകുന്നു.",
        btnLocation: "സ്ഥലം കണ്ടെത്തുക",
        phCity: "നഗരം",
        phState: "സംസ്ഥാനം",
        uploadText: "വിളയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
        phPrompt: "പ്രശ്നം വിവരിക്കുക...",
        btnSubmit: "രോഗനിർണ്ണയം",
        loadingTitle: "വിശകലനം ചെയ്യുന്നു...",
        loadingDesc: "AI ഉപദേശം തേടുന്നു",
        resultTitle: "റിപ്പോർട്ട്",
        footerText: "കർഷകർക്കായി ❤️ നിർമ്മിച്ചത്"
    },
    "mr-IN": {
        subtitle: "शेतकरी सल्लागार प्रणाली",
        heroTitle: "स्मार्ट शेती, आता सोपी.",
        heroDesc: "पिकाचा फोटो अपलोड करा. आमचा AI कृषी तज्ञ त्वरित सल्ला देईल.",
        btnLocation: "स्थान शोधा",
        phCity: "शहर",
        phState: "राज्य",
        uploadText: "पिकाचा फोटो टाका",
        phPrompt: "समस्या सांगा (उदा. 'पानांवर पिवळे डाग')...",
        btnSubmit: "निदान करा",
        loadingTitle: "माहिती तपासत आहे...",
        loadingDesc: "AI तज्ञाशी संपर्क साधत आहे",
        resultTitle: "निदान अहवाल",
        footerText: "शेतकऱ्यांसाठी ❤️ ने बनवले"
    },
    "bn-IN": {
        subtitle: "কৃষক পরামর্শ ব্যবস্থা",
        heroTitle: "স্মার্ট চাষ, এখন সহজ।",
        heroDesc: "ফসলের সমস্যার ছবি আপলোড করুন। আমাদের AI কৃষিবিদ তাৎক্ষণিক সমাধান দেবেন।",
        btnLocation: "অবস্থান সনাক্ত করুন",
        phCity: "শহর",
        phState: "রাজ্য",
        uploadText: "ফসলের ছবি আপলোড করুন",
        phPrompt: "সমস্যা বর্ণনা করুন...",
        btnSubmit: "রোগ নির্ণয় করুন",
        loadingTitle: "বিশ্লেষণ করা হচ্ছে...",
        loadingDesc: "AI পরামর্শ নিচ্ছে",
        resultTitle: "রিপোর্ট",
        footerText: "কৃষকদের জন্য ❤️ দিয়ে তৈরি"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locText = document.getElementById('locText'); // Text inside button
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

    // --- 0. BROWSER COMPATIBILITY CHECK (ADDED BACK) ---
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

    // --- 1. LANGUAGE SWITCHER LOGIC ---
    function updateInterfaceLanguage(langCode) {
        const t = translations[langCode] || translations['en-US'];

        // Update Text Elements (data-i18n)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (key === 'footerText') {
                    el.innerHTML = t[key].replace('❤️', '<i class="fa-solid fa-heart text-red-500 mx-1"></i>');
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Update Placeholders (data-placeholder)
        document.querySelectorAll('[data-placeholder]').forEach(el => {
            const key = el.getAttribute('data-placeholder');
            if (t[key]) {
                el.placeholder = t[key];
            }
        });
    }

    // Event Listener for Language Change
    languageSelect.addEventListener('change', (e) => {
        updateInterfaceLanguage(e.target.value);
    });

    // --- 2. Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') html.classList.add('dark');

    // --- 3. Location Intelligence ---
    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            const originalText = locText.textContent;
            locText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    cityInput.value = data.address.city || data.address.town || data.address.village || '';
                    stateInput.value = data.address.state || '';
                    
                    locText.innerHTML = '<i class="fa-solid fa-check"></i>';
                    setTimeout(() => updateInterfaceLanguage(languageSelect.value), 1500); 
                } catch (err) {
                    locText.textContent = originalText;
                }
            }, () => {
                alert("Location denied.");
                locText.textContent = originalText;
            });
        }
    });

    // --- 4. Image Handling ---
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

    // --- 5. Voice Input ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            if (voiceBtn.classList.contains('text-red-500')) {
                recognition.stop();
            } else {
                recognition.lang = languageSelect.value;
                try {
                    recognition.start();
                } catch (err) {
                    alert("Mic Error: " + err.message);
                }
            }
        });

        recognition.onstart = () => {
            voiceBtn.classList.add('text-red-500', 'bg-red-100', 'animate-pulse');
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('text-red-500', 'bg-red-100', 'animate-pulse');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            promptInput.value += (promptInput.value ? ' ' : '') + transcript;
        };
    } else {
        voiceBtn.style.display = 'none';
    }

    // --- 6. Submit to Backend ---
    submitBtn.addEventListener('click', async () => {
        const text = promptInput.value.trim();
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        const language = languageSelect.value;

        if (!text && !base64Image) {
            alert("Please provide input.");
            return;
        }

        if (currentAudio) { currentAudio.pause(); currentAudio = null; }

        submitBtn.disabled = true;
        resultSection.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');
        
        loadingIndicator.scrollIntoView({ behavior: 'smooth' });

        try {
            const response = await fetch('/api/consult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: text,
                    image: base64Image,
                    location: `${city}, ${state}`,
                    language: language
                })
            });

            const data = await response.json();

            if (data.success) {
                responseContent.innerHTML = marked.parse(data.response);
                resultSection.classList.remove('hidden');
                
                resultSection.scrollIntoView({ behavior: 'smooth' });

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
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Connection Failed.");
        } finally {
            loadingIndicator.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });
});