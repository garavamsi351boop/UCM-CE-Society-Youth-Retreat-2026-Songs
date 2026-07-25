const songs = [
{
    title: "నిన్నే ఆరాధింతును",
    lyrics: `
    నిన్నే ఆరాధింతును(4)
    
మహా మంచివాడు చాలా గొప్పవాడు 
నిన్ను పోలిన వారెవరు(2)

Halleluah halleluah 
    
1. పాపినైనా నన్ను నీవు నీ బిడ్డగా మార్చావే
మహా మంచివారు చాలా గొప్పవారు నిన్ను పోలిన వారెవరు

Halleluah halleluah 
    
2.నన్ను పిలిచిన దేవా నా నమ్మదగిన దేవా
మహా మంచివారు చాలా గొప్పవారు నిన్ను పోలిన వారెవరు

Halleluah halleluah 

3.నీ పరిశుధ ఆత్మతో నన్ను నింపుమా(2)
మహా మంచివారు చాలా గొప్పవారు నిన్ను పోలిన వారెవరు

Halleluah halleluah
`
},
{
    title: "మహిమ ఘనత",
    lyrics: `Lyrics will be added later`
},
{
    title: "యేసయ్యా నీవే",
    lyrics: `Lyrics will be added later`
}
];

const list = document.getElementById("song-list");

const lyricsBox = document.createElement("div");
lyricsBox.id = "lyrics-box";
document.body.appendChild(lyricsBox);

songs.forEach(song => {
    const div = document.createElement("div");
    div.className = "song";
    div.textContent = song.title;

    div.onclick = () => {
        lyricsBox.innerHTML = `
            <h2>${song.title}</h2>
            <pre>${song.lyrics}</pre>
        `;
    };

    list.appendChild(div);
});
