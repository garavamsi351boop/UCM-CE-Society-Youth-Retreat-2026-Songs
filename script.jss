const songs=[
{
title:"నిన్నె ఆరాధింతును"
},
{
title:"song 2"
},
{
title:"song 3"
}
];

const list=document.getElementById("song-list");

songs.forEach(song=>{
const div=document.createElement("div");
div.className="song";
div.innerHTML=song.title;
list.appendChild(div);
});
