const songs = [
    {
        number: 1,
        title: "నిన్నే ఆరాధింతును",
        lyrics: `నిన్నే ఆరాధింతును(4)
మహా మంచివాడు చాలా గొప్పవాడు
నిన్ను పోలిన వారెవరు(2)

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
        lyrics: `మహిమ ఘనత నీకే చెల్లును దేవా...
హల్లెలూయా హల్లెలూయా

మహా మహిమతో రారాజుగా
త్వరలోనే యేసు వచ్చును`
    },
    {
        number: 3,
        title: "యేసయ్యా నీవే",
        lyrics: `యేసయ్యా నీవే నా ఆశ్రయము
నీవే నా దుర్గము దేవా

నన్నెంతో ప్రేమించి కాపాడితివి
నీకే నా స్తుతులు సమర్పింతును`
    }
];

const list = document.getElementById("song-list");
const lyricsBox = document.getElementById("lyrics-box");
const searchInput = document.getElementById("search");
const presOverlay = document.getElementById("presentation-overlay");

let currentSong = null;
let presentationSlides = [];
let currentSlideIndex = 0;
let currentFontSize = 21;

// Helper to format song numbers (e.g. 1 -> "01")
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
        div.className = "song";
        div.innerHTML = `
            <div class="song-left">
                <span class="song-badge">#${formatSongNumber(song.number)}</span>
                <span class="song-title">${song.title}</span>
            </div>
            <span class="song-arrow">❯</span>
        `;
        div.onclick = () => showLyrics(song);
        list.appendChild(div);
    });
}

// Show Lyrics Card
function showLyrics(song) {
    currentSong = song;
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
                <button class="action-btn present-btn" onclick="startPresentation()" title="Present Mode">🖥️</button>
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

function closeLyrics() {
    lyricsBox.style.display = "none";
}

/* ================= PRESENTATION LOGIC ================= */
function startPresentation() {
    if (!currentSong) return;

    // Splits lyrics by blank lines into individual verse slides
    presentationSlides = currentSong.lyrics
        .split(/\n\s*\n/)
        .map(slide => slide.trim())
        .filter(slide => slide.length > 0);

    currentSlideIndex = 0;
    presOverlay.style.display = "flex";
    updateSlide();
}

function exitPresentation() {
    presOverlay.style.display = "none";
}

function updateSlide() {
    const totalSlides = presentationSlides.length;
    const currentVerseText = presentationSlides[currentSlideIndex];

    document.getElementById("pres-content").innerHTML = `
        <div class="pres-telugu">${currentVerseText}</div>
    `;

    document.getElementById("pres-title").textContent = currentSong.title;
    document.getElementById("pres-counter").textContent = `${currentSlideIndex + 1} / ${totalSlides}`;

    const upNextElem = document.getElementById("pres-upnext");
    if (currentSlideIndex < totalSlides - 1) {
        upNextElem.textContent = `Up next: verse ${currentSlideIndex + 2}`;
    } else {
        upNextElem.textContent = "End of Song";
    }
}

function nextSlide(e) {
    if (e) e.stopPropagation();
    if (currentSlideIndex < presentationSlides.length - 1) {
        currentSlideIndex++;
        updateSlide();
    }
}

function prevSlide(e) {
    if (e) e.stopPropagation();
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlide();
    }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (presOverlay.style.display === "flex") {
        if (e.key === "ArrowRight" || e.key === " ") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "Escape") exitPresentation();
    }
});

// Search Filter
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

// Initial Render
renderSongs(songs);
