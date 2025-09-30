import yts from 'yt-search'
import ytdl from 'ytdl-core'

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) throw `🌸✨ Ingresa el nombre de la música que quieres escuchar, onii-chan~ 💕`

    // Buscar en YouTube
    const search = await yts(text)
    if (!search.all || search.all.length === 0) {
      throw "❌ No encontré nada… gomen~ 😿"
    }

    const videoInfo = search.all[0]
    const body = `🍓 𝗧𝗶𝘁𝘂𝗹𝗼: *${videoInfo.title}*\n` +
                 `🌸 𝗖𝗮𝗻𝗮𝗹: *${videoInfo.author.name || 'Desconocido'}*\n` +
                 `👀 𝗩𝗶𝘀𝘁𝗮𝘀: *${videoInfo.views}*\n` +
                 `⏳ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: *${videoInfo.timestamp}*\n` +
                 `📅 𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼: *${videoInfo.ago}*\n` +
                 `🔗 𝗟𝗶𝗻𝗸: ${videoInfo.url}\n\n` +
                 `> ✨ Aquí tienes tu dosis de música, onii-chan~ 💖`

    // ─── PLAY (info + botones)
    if (command === 'play' || command === 'play2' || command === 'playvid') {
      await conn.sendMessage(m.chat, {
        image: { url: videoInfo.thumbnail },
        caption: body,
        footer: "🌸 Itsuki-Bot • powered by Nakano family 💕",
        buttons: [
          {
            buttonId: `.yta ${videoInfo.url}`,
            buttonText: { displayText: '🎶 Descargar MP3' }
          },
          {
            buttonId: `.ytv ${videoInfo.url}`,
            buttonText: { displayText: '🎬 Descargar MP4' }
          }
        ],
        viewOnce: true,
        headerType: 4,
      }, { quoted: m })
      m.react('🍓')
    }

    // ─── YT AUDIO (stream directo)
    else if (command === 'yta' || command === 'ytmp3') {
      m.react('⏳')
      const stream = ytdl(videoInfo.url, { filter: 'audioonly', quality: 'highestaudio' })
      await conn.sendMessage(m.chat, {
        audio: stream,
        mimetype: 'audio/mpeg',
        fileName: `${videoInfo.title}.mp3`,
        caption: `🎧 Aquí está tu canción, disfruta~ 🌸`
      }, { quoted: m })
      m.react('✅')
    }

    // ─── YT VIDEO (stream directo)
    else if (command === 'ytv' || command === 'ytmp4') {
      m.react('⏳')
      const stream = ytdl(videoInfo.url, { filter: 'videoandaudio', quality: '18' }) // 360p
      await conn.sendMessage(m.chat, {
        video: stream,
        mimetype: 'video/mp4',
        fileName: `${videoInfo.title}.mp4`,
        caption: `📺 Aquí está tu video, disfrútalo~ 💕`
      }, { quoted: m })
      m.react('✅')
    }

    else {
      throw "⚠️ Comando desconocido, prueba con *.play + canción* 🌸"
    }
  } catch (e) {
    console.error("Error en comando:", e)
    m.reply("❌ Onii-chan~, ocurrió un error inesperado 😿")
  }
}

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3']
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3']
handler.tags = ['dl']
handler.register = true

export default handler