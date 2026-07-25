const songs = [
    {
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
        title: "మహిమ ఘనత",
        lyrics: "మహిమ ఘనత నీకే చెల్లును దేవా...\n(Lyrics will be updated soon)"
    },
    {
        title: "యేసయ్యా నీవే",
        lyrics: "యేసయ్యా నీవే నా ఆశ్రయము...\n(Lyrics will be updated soon)"
    }
];

const list = document.getElementById("song-list");
const lyricsBox = document.getElementById("lyrics-box");
const searchInput = document.getElementById("search");

// Function to display song list
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

// Display song lyrics box
function showLyrics(song) {
    lyricsBox.style.display = "block";
    lyricsBox.innerHTML = `
        <button class="close-btn" onclick="closeLyrics()">✕ Close</button>
        <h2>${song.title}</h2>
        <div class="lyrics-divider">― ✦ ―</div>
        <pre>${song.lyrics}</pre>
    `;
    lyricsBox.scrollIntoView({ behavior: 'smooth' });
}

// Hide lyrics box
function closeLyrics() {
    lyricsBox.style.display = "none";
}

// Live search listener
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
