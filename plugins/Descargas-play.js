import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🌸✨ Ingresa el nombre de la música que quieres escuchar, onii-chan~ 💕`;

  const search = await yts(text);
  if (!search.all || search.all.length === 0) {
    throw "❌ No encontré nada… gomen~ 😿";
  }

  const videoInfo = search.all[0];
  const body = `🍓 𝗧𝗶𝘁𝘂𝗹𝗼: *${videoInfo.title}*\n` +
               `🌸 𝗖𝗮𝗻𝗮𝗹: *${videoInfo.author.name || 'Desconocido'}*\n` +
               `👀 𝗩𝗶𝘀𝘁𝗮𝘀: *${videoInfo.views}*\n` +
               `⏳ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: *${videoInfo.timestamp}*\n` +
               `📅 𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼: *${videoInfo.ago}*\n` +
               `🔗 𝗟𝗶𝗻𝗸: ${videoInfo.url}\n\n` +
               `> ✨ Aquí tienes tu dosis de música, onii-chan~ 💖`;

  // ─── PLAY ───────────────────────────────
  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: "🌸 Itsuki-Bot • powered by Nakano family 💕",
      buttons: [
        {
          buttonId: `.yta ${videoInfo.url}`,
          buttonText: { displayText: '🎶 Descargar MP3' },
        },
        {
          buttonId: `.ytv ${videoInfo.url}`,
          buttonText: { displayText: '🎬 Descargar MP4' },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: fkontak });
    m.react('🍓');

  // ─── YT AUDIO ───────────────────────────────
  } else if (command === 'yta' || command === 'ytmp3') {
    m.react('⏳');
    let audio;
    try {
      audio = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json();
      if (!audio.data?.url) throw new Error('API 1 falló');
    } catch {
      try {
        audio = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`)).json();
        if (!audio.url && !audio.result?.url) throw new Error('API 2 falló');
      } catch {
        audio = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`)).json();
      }
    }

    const audioUrl = audio.data?.url || audio.url || audio.result?.url;
    if (!audioUrl) throw "😿 No pude conseguir el audio, onii-chan…";

    conn.sendFile(m.chat, audioUrl, videoInfo.title + ".mp3", `🎧 Aquí está tu canción, disfruta~ 🌸`, m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react('✅');

  // ─── YT VIDEO ───────────────────────────────
  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('⏳');
    let video;
    try {
      video = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json();
      if (!video.data?.url) throw new Error('API 1 falló');
    } catch {
      try {
        video = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`)).json();
        if (!video.url && !video.result?.url) throw new Error('API 2 falló');
      } catch {
        video = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`)).json();
      }
    }

    const videoUrl = video.data?.url || video.url || video.result?.url;
    if (!videoUrl) throw "😿 No pude conseguir el video, onii-chan…";

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: "video/mp4",
      caption: `📺 Aquí está tu video, disfrútalo~ 💕`,
    }, { quoted: m });

    m.react('✅');

  } else {
    throw "⚠️ Comando desconocido, prueba con *.play + canción* 🌸";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;

// Función auxiliar para extraer ID de YouTube
const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};