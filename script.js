const songs = [
    {
        number: 1,
        title: "నిన్నే ఆరాధింతును",
        lyrics: `నిన్నే ఆరాధింతును(4)
మహా మంచివాడు చాలా గొప్పవాడు
ఎన్ను పోలిన వారెవరు(2)

Halleluah halleluah

1. పాపినైనా నన్ను నీవు నీ బిడ్డగా మార్చావే
మహా మంచివారు చాలా గొప్పవారు నిన్ను పోలిన వారెవరు

Halleluah halleluah

2. నన్ను పిలిచిన దేవా నా నమ్మదగిన దేవా
మహా మంచివారు చాలా గొప్పవారు నిన్ను పోలిన వారెవరు

Halleluah halleluah

3. నీ పరిశుధ ఆత్మతో నన్ను నింపుమా(2)
మహా మంచివారు చాలా గొప్పవారు నిన్ను పోలిన వారెవరు

Halleluah halleluah`
    },
    {
        number: 2,
        title: "మహిమ ఘనత",
        lyrics: "మహిమ ఘనత నీకే చెల్లును దేవా...\n(Lyrics will be updated soon)"
    },
    {
        number: 3,
        title: "యేసయ్యా నీవే",
        lyrics: "యేసయ్యా నీవే నా ఆశ్రయము...\n(Lyrics will be updated soon)"
    }
];

const list = document.getElementById("song-list");
const lyricsBox = document.getElementById("lyrics-box");
const searchInput = document.getElementById("search");
const backToTopBtn = document.getElementById("backToTop");

let currentFontSize = 21;

// Helper to format single digits into 2-digit strings (e.g. 1 -> "01")
function formatSongNumber(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

// Render Songs List
function renderSongs(songsToDisplay) {
    list.innerHTML = "";

    if (songsToDisplay.length === 0) {
        list.innerHTML = `<p style="text-align: center; color: rgba(255,255,255,0.7); font-size: 18px; margin-top: 25px;">No songs found</p>`;
        return;
    }

    songsToDisplay.forEach(song => {
        const div = document.createElement("div");
        div.className = "song ripple";
        div.innerHTML = `
            <div class="song-left">
                <span class="song-badge">#${formatSongNumber(song.number)}</span>
                <span class="song-title">${song.title}</span>
            </div>
            <span class="song-arrow">❯</span>
        `;

        div.onclick = (e) => {
            createRipple(e, div);
            showLyrics(song);
        };
        list.appendChild(div);
    });
}

// Show Lyrics Card
function showLyrics(song) {
    lyricsBox.style.display = "block";
    currentFontSize = 21;

    lyricsBox.innerHTML = `
        <div class="lyrics-header-controls">
            <div class="font-controls">
                <button class="font-btn" onclick="changeFontSize(-2)">A-</button>
                <span id="font-size-indicator">${currentFontSize}px</span>
                <button class="font-btn" onclick="changeFontSize(2)">A+</button>
            </div>
            
            <div class="action-buttons">
                <button class="action-btn copy-btn" onclick="copyLyrics('${song.title}')">📋 Copy</button>
                <button class="action-btn share-btn" onclick="shareWhatsApp('${song.title}')">💬 Share</button>
                <button class="close-btn" onclick="closeLyrics()">✕</button>
            </div>
        </div>

        <div class="lyrics-title-wrapper">
            <span class="lyrics-song-badge">Song #${formatSongNumber(song.number)}</span>
            <h2>${song.title}</h2>
        </div>
        
        <div class="lyrics-divider">― ✦ ―</div>
        <pre id="lyrics-text" style="font-size: ${currentFontSize}px;">${song.lyrics}</pre>
    `;

    lyricsBox.scrollIntoView({ behavior: 'smooth' });
}

// Font Size Controls
function changeFontSize(delta) {
    const lyricsText = document.getElementById("lyrics-text");
    const indicator = document.getElementById("font-size-indicator");
    
    if (lyricsText) {
        let newSize = currentFontSize + delta;
        if (newSize >= 15 && newSize <= 35) {
            currentFontSize = newSize;
            lyricsText.style.fontSize = `${currentFontSize}px`;
            if (indicator) indicator.textContent = `${currentFontSize}px`;
        }
    }
}

// Copy Lyrics Function
function copyLyrics(title) {
    const song = songs.find(s => s.title === title);
    if (!song) return;

    const textToCopy = `✝ ${song.title} (#${formatSongNumber(song.number)})\n\n${song.lyrics}\n\n— UCM CE Society Youth Retreat 2026`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Lyrics copied to clipboard!");
    });
}

// Share via WhatsApp Function
function shareWhatsApp(title) {
    const song = songs.find(s => s.title === title);
    if (!song) return;

    const shareText = `*${song.title}* (#${formatSongNumber(song.number)})\n\n${song.lyrics}\n\n_UCM CE Society Youth Retreat 2026_`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
}

// Close Lyrics Box
function closeLyrics() {
    lyricsBox.style.display = "none";
}

// Search Logic (Handles Song Numbers & Titles)
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim().replace('#', '');
    
    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.lyrics.toLowerCase().includes(query) ||
        song.number.toString() === query ||
        formatSongNumber(song.number) === query
    );
    renderSongs(filtered);
});

// Interactive Ripple Effect
function createRipple(event, element) {
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-effect");

    const ripple = element.getElementsByClassName("ripple-effect")[0];
    if (ripple) {
        ripple.remove();
    }

    element.appendChild(circle);
}

// Back to Top Scroll Logic
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial Render
renderSongs(songs);
