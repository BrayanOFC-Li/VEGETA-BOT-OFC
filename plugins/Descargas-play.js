import yts from 'yt-search'
import ytdl from 'ytdl-core'
import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) throw `🌸 Ingresa el nombre o link del video que quieras, onii-chan~`

    let videoInfo
    if (ytdl.validateURL(text)) {
      const info = await ytdl.getInfo(text)
      videoInfo = {
        title: info.videoDetails.title,
        author: { name: info.videoDetails.author.name },
        views: info.videoDetails.viewCount,
        timestamp: new Date(info.videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8),
        ago: info.videoDetails.uploadDate,
        url: info.videoDetails.video_url,
        thumbnail: info.videoDetails.thumbnails[0].url
      }
    } else {
      const search = await yts(text)
      if (!search.all || search.all.length === 0) throw "❌ No encontré nada, gomen~"
      videoInfo = search.all[0]
    }

    const body = `🍓 𝗧𝗶𝘁𝘂𝗹𝗼: *${videoInfo.title}*\n` +
                 `🌸 𝗖𝗮𝗻𝗮𝗹: *${videoInfo.author?.name || 'Desconocido'}*\n` +
                 `👀 𝗩𝗶𝘀𝘁𝗮𝘀: *${videoInfo.views}*\n` +
                 `⏳ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: *${videoInfo.timestamp}*\n` +
                 `📅 𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼: *${videoInfo.ago}*\n` +
                 `🔗 𝗟𝗶𝗻𝗸: ${videoInfo.url}\n\n` +
                 `> ✨ Pedido listo, onii-chan~ 💖`

    // ─── INFO
    if (command === 'play') {
      await conn.sendMessage(m.chat, {
        image: { url: videoInfo.thumbnail },
        caption: body
      }, { quoted: m })
      m.react('🍓')
    }

    // ─── AUDIO
    else if (command === 'yta' || command === 'ytmp3') {
      m.react('⏳')
      const filePath = path.join('./tmp', `${Date.now()}.mp3`)
      const stream = ytdl(videoInfo.url, { filter: 'audioonly', quality: 'highestaudio' })
      const writeStream = fs.createWriteStream(filePath)
      stream.pipe(writeStream)

      writeStream.on('finish', async () => {
        await conn.sendMessage(m.chat, {
          audio: { url: filePath },
          mimetype: 'audio/mpeg',
          fileName: `${videoInfo.title}.mp3`,
          caption: `🎧 Aquí tienes tu canción, disfruta~ 🌸`
        }, { quoted: m })
        fs.unlinkSync(filePath) // borra el archivo después
        m.react('✅')
      })
    }

    // ─── VIDEO
    else if (command === 'ytv' || command === 'ytmp4') {
      m.react('⏳')
      const filePath = path.join('./tmp', `${Date.now()}.mp4`)
      const stream = ytdl(videoInfo.url, { filter: 'videoandaudio', quality: '18' }) // 360p
      const writeStream = fs.createWriteStream(filePath)
      stream.pipe(writeStream)

      writeStream.on('finish', async () => {
        await conn.sendMessage(m.chat, {
          video: { url: filePath },
          mimetype: 'video/mp4',
          fileName: `${videoInfo.title}.mp4`,
          caption: `📺 Aquí tienes tu video, disfrútalo~ 💕`
        }, { quoted: m })
        fs.unlinkSync(filePath)
        m.react('✅')
      })
    }

    else {
      throw "⚠️ Usa *.play + nombre*, *.yta + nombre* o *.ytv + nombre* 🌸"
    }
  } catch (e) {
    console.error("Error en comando:", e)
    m.reply("❌ Ocurrió un error inesperado 😿")
  }
}

handler.help = ['play <búsqueda>', 'yta <búsqueda>', 'ytv <búsqueda>']
handler.command = ['play', 'yta', 'ytmp3', 'ytv', 'ytmp4']
handler.tags = ['dl']
handler.register = true

export default handler