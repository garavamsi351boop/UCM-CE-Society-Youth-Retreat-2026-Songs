const songs = [
    {
        number: 1,
        title: "ఎన్నే ఆరాధింతును",
        lyrics: `ఎన్నే ఆరాధింతును(4)

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

// Default font size in pixels
let currentFontSize = 21; 

// Render song list
function renderSongs(songsToDisplay) {
    list.innerHTML = "";

    if (songsToDisplay.length === 0) {
        list.innerHTML = `<p style="text-align: center; color: rgba(255,255,255,0.7); font-size: 18px; margin-top: 20px;">No songs found</p>`;
        return;
    }

    songsToDisplay.forEach(song => {
        const div = document.createElement("div");
        div.className = "song";
        div.innerHTML = `
            <span class="song-title">
                <span class="music-icon">🎵</span> ${song.title}
            </span>
            <span class="song-arrow">❯</span>
        `;

        div.onclick = () => showLyrics(song);
        list.appendChild(div);
    });
}

// Show lyrics with Font Controls
function showLyrics(song) {
    lyricsBox.style.display = "block";
    
    // Reset font size to default when opening a new song
    currentFontSize = 21; 

    lyricsBox.innerHTML = `
        <div class="lyrics-header-controls">
            <div class="font-controls">
                <button class="font-btn" onclick="changeFontSize(-2)" title="Decrease font size">A-</button>
                <span id="font-size-indicator">${currentFontSize}px</span>
                <button class="font-btn" onclick="changeFontSize(2)" title="Increase font size">A+</button>
            </div>
            <button class="close-btn" onclick="closeLyrics()">✕ Close</button>
        </div>
        <h2>${song.title}</h2>
        <div class="lyrics-divider">― ✦ ―</div>
        <pre id="lyrics-text" style="font-size: ${currentFontSize}px;">${song.lyrics}</pre>
    `;
    
    lyricsBox.scrollIntoView({ behavior: 'smooth' });
}

// Change Font Size Function
function changeFontSize(delta) {
    const lyricsText = document.getElementById("lyrics-text");
    const indicator = document.getElementById("font-size-indicator");
    
    // Set limits (min: 15px, max: 35px)
    if (lyricsText) {
        let newSize = currentFontSize + delta;
        if (newSize >= 15 && newSize <= 35) {
            currentFontSize = newSize;
            lyricsText.style.fontSize = `${currentFontSize}px`;
            if (indicator) indicator.textContent = `${currentFontSize}px`;
        }
    }
}

// Hide lyrics
function closeLyrics() {
    lyricsBox.style.display = "none";
}

// Search filter
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.lyrics.toLowerCase().includes(query)
    );
    renderSongs(filtered);
});

// Initial Render
renderSongs(songs);
