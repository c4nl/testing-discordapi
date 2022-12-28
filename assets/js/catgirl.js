API_URL=`https://api.lanyard.rest/v1`;let hovering=false
document.addEventListener(`contextmenu`,(e)=>e.preventDefault());function ctrlShiftKey(e,keyCode){return e.ctrlKey&&e.shiftKey&&e.keyCode===keyCode.charCodeAt(0);}
document.onkeydown=(e)=>{if(event.keyCode===123||ctrlShiftKey(e,`I`)||ctrlShiftKey(e,`J`)||ctrlShiftKey(e,`C`)||(e.ctrlKey&&e.keyCode===`U`.charCodeAt(0)))
return false;};document.addEventListener('touchstart',function(e){console.log('touchstart');e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();});async function fetchResponse(userId){try{const url=await fetch(`${API_URL}/users/${userId}`);const response=await url.json();return response;}catch(error){console.error(error);}}
async function setAvatar(USERID,card){const response=await fetchResponse(USERID);var avatarId=response.data.discord_user.avatar;var fullUrl=`https://cdn.discordapp.com/avatars/${USERID}/${avatarId}`;if(response.data.discord_user.avatar)document.getElementsByClassName(`${card}-pfp`)[0].src=fullUrl;else document.getElementsByClassName(`${card}-pfp`)[0].src="https://cdn.discordapp.com/embed/avatars/1.png"}
async function setAvatarFrame(USERID,card){const response=await fetchResponse(USERID);switch(response.data.discord_status){case `online`:document.getElementsByClassName(`${card}-activity-dot`)[0].style.background=`#3ba45d`;document.getElementsByClassName(`${card}-activity-dot`)[0].title=`Online`;break;case `dnd`:document.getElementsByClassName(`${card}-activity-dot`)[0].style.background=`#ed4245`;document.getElementsByClassName(`${card}-activity-dot`)[0].title=`Do not disturb`;break;case `idle`:document.getElementsByClassName(`${card}-activity-dot`)[0].style.background=`#faa81a`;document.getElementsByClassName(`${card}-activity-dot`)[0].title=`Idle`;break;case `offline`:document.getElementsByClassName(`${card}-activity-dot`)[0].style.background=`#747e8c`;document.getElementsByClassName(`${card}-activity-dot`)[0].title=`Offline`;break;}
let presence=response.data.activities.find(r=>r.type===1)
if(presence){if(presence.url.includes("twitch.tv")){document.getElementsByClassName(`${card}-activity-dot`)[0].style.background=`#301934`;document.getElementsByClassName(`${card}-activity-dot`)[0].title=`Streaming`;}}}
async function setUsername(USERID,card){const response=await fetchResponse(USERID);var user=response.data.discord_user.username;var discriminator=response.data.discord_user.discriminator;if(user.length>10)user=user.slice(0,10)+"..."
var fullName=`${user}#${discriminator}`;document.getElementsByClassName(`${card}-username`)[0].innerHTML=fullName;document.getElementById(`${card}-title`).innerHTML=`@${user}`;}
async function onHover(USERID,card){hovering=true;const response=await fetchResponse(USERID);let rpc=response.data.activities.find(r=>r.type===0)
if(response.data.listening_to_spotify===true)document.getElementsByClassName(`${card}-pfp`)[0].src=response.data.spotify.album_art_url
else if(rpc)document.getElementsByClassName(`${card}-pfp`)[0].src=`https://cdn.discordapp.com/app-assets/`+rpc.application_id+`/`+rpc.assets.large_image+`.png`
if(response.data.listening_to_spotify===true)document.getElementsByClassName(`${card}-username`)[0].innerHTML="Listening to Spotify"
else if(rpc)document.getElementsByClassName(`${card}-username`)[0].innerHTML=rpc.name
if(response.data.listening_to_spotify===true)document.getElementById(`${card}-title`).innerHTML=`@${response.data.discord_user.username} > Playing "${response.data.spotify.song}"`
else if(rpc)document.getElementById(`${card}-title`).innerHTML=`@${response.data.discord_user.username} > Playing ${rpc.name}`
if(response.data.listening_to_spotify===true)document.getElementsByClassName(`${card}-status`)[0].innerHTML=response.data.spotify.artist
else if(rpc){if(rpc.details.length>30)document.getElementsByClassName(`${card}-status`)[0].innerHTML=rpc.details.slice(0,15)+"..."
else document.getElementsByClassName(`${card}-status`)[0].innerHTML=rpc.details}}
async function offHover(USERID,card){hovering=false;const response=await fetchResponse(USERID);if(response.data.discord_user.username.length>10)document.getElementsByClassName(`${card}-username`)[0].innerHTML=`${response.data.discord_user.username.slice(0,10)+"..."}#${response.data.discord_user.discriminator}`
else document.getElementsByClassName(`${card}-username`)[0].innerHTML=`${response.data.discord_user.username}#${response.data.discord_user.discriminator}`
if(response.data.discord_user.avatar)document.getElementsByClassName(`${card}-pfp`)[0].src=`https://cdn.discordapp.com/avatars/${USERID}/${response.data.discord_user.avatar}`
else document.getElementsByClassName(`${card}-pfp`)[0].src="https://cdn.discordapp.com/embed/avatars/1.png"
document.getElementById(`${card}-title`).innerHTML=`@${response.data.discord_user.username}`;let status=response.data.activities[0].name;if(response.data.activities.find(r=>r.type===4)){let customstat=response.data.activities.find(r=>r.type===4)
if(!customstat)return;if(customstat.emoji){let link="https://cdn.discordapp.com/emojis/"
if(customstat.emoji.animated){link=link+customstat.emoji.id+".gif"}else link=link+customstat.emoji.id+".png"
if(!customstat.state)document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  `
else if(customstat.state.length>20)document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  ${customstat.state.slice(0,20)}...`
else document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  ${customstat.state}`}else{if(!customstat.state)return
else if(customstat.state.length>10)document.getElementsByClassName(`${card}-status`)[0].innerHTML=`${customstat.state.slice(0,20)}...`
else document.getElementsByClassName(`${card}-status`)[0].innerHTML=`${customstat.state}`}}
else if(response.data.listening_to_spotify===true){if(document.getElementById(`${card}-title`).innerHTML===`@${response.data.discord_user.username} > Listening to Spotify`)return;let customstat=response.data.activities.find(r=>r.type===4)
if(!customstat)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Listening to Spotify`;if(customstat.emoji){let link="https://cdn.discordapp.com/emojis/"
if(customstat.emoji.animated){link=link+customstat.emoji.id+".gif"}else link=link+customstat.emoji.id+".png"
document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  Listening to Spotify`}}else{let rpc=response.data.activities.find(r=>r.type===0)
if(rpc)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Playing ${rpc.name}`
let rpc1=response.data.activities.find(r=>r.type===3)
if(rpc1)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Watching ${rpc1.name}`
let rpc2=response.data.activities.find(r=>r.type===1)
if(rpc2)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Streaming ${rpc2.name}`
let rpc3=response.data.activities.find(r=>r.type===5)
if(rpc3)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Competing in ${rpc3.name}`
if(status===undefined)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Status unavailable.`;document.getElementsByClassName(`${card}-status`).innerHTML=`Status unavailable.`;}}
const el=document.getElementsByClassName('aryan')[0]
el.addEventListener('mouseover',function handleMouseOver(){onHover(`796499883326046309`,`aryan`);});el.addEventListener('mouseout',function handleMouseOut(){offHover(`796499883326046309`,`aryan`);});async function setStatus(USERID,card){if(hovering)return;const response=await fetchResponse(USERID);if(response.data.discord_status==`offline`){return;}
if(response.data.listening_to_spotify===true){let customstat=response.data.activities.find(r=>r.type===4)
if(!customstat)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Listening to Spotify`;if(customstat.emoji){let link="https://cdn.discordapp.com/emojis/"
if(customstat.emoji.animated){link=link+customstat.emoji.id+".gif"}else link=link+customstat.emoji.id+".png"
document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  Listening to Spotify`}}
else if(response.data.activities.find(r=>r.type===4)){let customstat=response.data.activities.find(r=>r.type===4)
if(customstat.emoji){let link="https://cdn.discordapp.com/emojis/"
if(customstat.emoji.animated){link=link+customstat.emoji.id+".gif"}else link=link+customstat.emoji.id+".png"
if(!customstat.state)document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  `
else if(customstat.state.length>20)document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  ${customstat.state.slice(0,20)}...`
else document.getElementsByClassName(`${card}-status`)[0].innerHTML=`<img class="${card}-emoji" id="emojistat" src="${link}">  ${customstat.state}`}else{if(customstat.state.length>20)document.getElementsByClassName(`${card}-status`)[0].innerHTML=`${customstat.state.slice(0,20)}...`
else document.getElementsByClassName(`${card}-status`)[0].innerHTML=`${customstat.state}`}}
else{let rpc=response.data.activities.find(r=>r.type===0)
if(rpc)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Playing ${rpc.name}`
let rpc1=response.data.activities.find(r=>r.type===3)
if(rpc1)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Watching ${rpc1.name}`
let rpc2=response.data.activities.find(r=>r.type===1)
if(rpc2)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Streaming ${rpc2.name}`
let rpc3=response.data.activities.find(r=>r.type===5)
if(rpc3)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Competing in ${rpc3.name}`
if(status===undefined)return document.getElementsByClassName(`${card}-status`)[0].innerHTML=`Status unavailable.`;document.getElementsByClassName(`${card}-status`).innerHTML=`Status unavailable.`;}}
async function setSpotifyBar(USERID,card){const response=await fetchResponse(USERID);var bar=document.getElementsByClassName(`${card}-spotify-innerbar`)[0];var bar2=document.getElementsByClassName(`${card}-spotify-time-end`)[0];var bar3=document.getElementsByClassName(`${card}-spotify-time-start`)[0];if(response.data.listening_to_spotify==false){bar.style.display=`none`;bar2.innerHTML=``;bar3.innerHTML=``;return;}
const date=new Date().getTime();const v1=response.data.spotify.timestamps.end-
response.data.spotify.timestamps.start;const v2=date-response.data.spotify.timestamps.start;function spotifyTimeSet(date,element){const x=document.getElementsByClassName(element)[0];const y=new Date(date);const minutes=y.getMinutes();const seconds=y.getSeconds();const formmatedseconds=seconds<10?`0${seconds}`:seconds;x.innerHTML=`${minutes}:${formmatedseconds}`;}
spotifyTimeSet(v1,`${card}-spotify-time-end`);spotifyTimeSet(v2,`${card}-spotify-time-start`);prcnt=(v2/v1)*100;precentage=Math.trunc(prcnt);prccc=Math.round((prcnt+Number.EPSILON)*100)/100;i=1;bar.style.display=`block`;bar.style.width=prccc+`%`;}
async function presenceInvoke(USERID,card){setSpotifyAlbumCover(USERID,card);setSpotifyArtist(USERID,card);setSpotifySongName(USERID,card);setSpotifyBar(USERID,card);}
async function statusInvoke(USERID,card){setStatus(USERID,card);setAvatarFrame(USERID,card);}
async function invoke(USERID,card){setAvatar(USERID,card);setUsername(USERID,card);setInterval(function(){setSpotifyBar(USERID,card);statusInvoke(USERID,card)},1000)}