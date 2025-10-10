import yts from 'yt-search'
import fetch from 'node-fetch'

async function apiAdonix(url) {
  const apiURL = `https://apiadonix.kozow.com/download/ytmp4?apikey=${global.apikey}&url=${encodeURIComponent(url)}`
  const res = await fetch(apiURL)
  const data = await res.json()

  if (!data.status || !data.data?.url) throw new Error('¡La API de Adonix ha fallado, insecto!')
  return { url: data.data.url, title: data.data.title || 'Video sin título...', fuente: 'Adonix' }
}

async function apiJoseDev(url) {
  const apiURL = `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(url)}&apikey=sylphy-9fe8`
  const res = await fetch(apiURL)
  const data = await res.json()

  if (!data.status || !data.res?.url) throw new Error('¡La API de JoseDev no devolvió datos, patético!')
  return { url: data.res.url, title: data.res.title || 'Video sin título...', fuente: 'JoseDev' }
}

async function ytdl(url) {
  try {
    console.log('💥 Intentando con API Adonix...')
    return await apiAdonix(url)
  } catch (e1) {
    console.warn('⚠️ Adonix falló:', e1.message)
    console.log('🔥 Cambiando a API JoseDev...')
    return await apiJoseDev(url)
  }
}

let handler = async (m, { conn, text, usedPrefix }) => {
  const ctxErr = (global.rcanalx || {})
  const ctxWarn = (global.rcanalw || {})
  const ctxOk = (global.rcanalr || {})

  if (!text)
    return conn.reply(m.chat, '💢 ¡Insecto! Debes decirme el nombre del video que quieres. No leeré tu mente.', m, ctxWarn)

  try {
    await conn.reply(m.chat, 'Vegeta está buscando tu *video*... ¡Prepárate para la descarga, insecto!', m, ctxOk)

    const searchResults = await yts(text)
    if (!searchResults.videos.length) throw new Error('¡No encontré nada! ¡Tus gustos son tan débiles como Kakarotto!')

    const video = searchResults.videos[0]
    const { url, title, fuente } = await ytdl(video.url)

    const caption = `
🔥 *Video listo, insecto... descargado por el Príncipe Saiyajin.* 🔥
💥 *Título:* ${title}
⏱ *Duración:* ${video.timestamp}
👤 *Autor:* ${video.author.name}
🔗 *Enlace:* ${video.url}

🌐 *Fuente:* ${fuente}
⚡ *Poder de descarga Saiyajin completado.* ⚡
> "¡Jamás seré superado por Kakarotto!"
`.trim()

    const buffer = await fetch(url).then(res => res.buffer())

    await conn.sendMessage(
      m.chat,
      {
        video: buffer,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption
      },
      { quoted: m }
    )

  } catch (e) {
    console.error('💀 Error en play2:', e)
    await conn.reply(m.chat, `💢 ¡Error, insecto!: ${e.message}`, m, ctxErr)
  }
}

handler.help = ['play2 <nombre>']
handler.tags = ['downloader']
handler.command = ['play2']

export default handler