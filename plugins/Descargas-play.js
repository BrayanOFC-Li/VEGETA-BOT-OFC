import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix }) => {
  const ctxErr = (global.rcanalx || {})
  const ctxWarn = (global.rcanalw || {})
  const ctxOk = (global.rcanalr || {})

  if (!text) return conn.reply(m.chat, '💢 ¡Insecto! Di el nombre de la canción o no perderé mi tiempo contigo.', m, ctxWarn)

  try {
    await conn.reply(m.chat, ' Vegeta está buscando tu *audio*... ¡Espero que valga la pena, débil terrícola!', m, ctxOk)

    const search = await yts(text)
    if (!search.videos.length) throw new Error('¡Nada encontrado! Tus gustos son tan lamentables como los de Kakarotto.')

    const video = search.videos[0]
    const { title, url, thumbnail } = video

    let thumbBuffer = null
    if (thumbnail) {
      try {
        const resp = await fetch(thumbnail)
        thumbBuffer = Buffer.from(await resp.arrayBuffer())
      } catch (err) {
        console.log('No se pudo obtener la miniatura:', err.message)
      }
    }

    const fuentes = [
      { api: 'Adonix', endpoint: `https://apiadonix.kozow.com/download/ytmp3?apikey=${global.apikey}&url=${encodeURIComponent(url)}`, extractor: res => res?.data?.url },
      { api: 'ZenzzXD', endpoint: `https://api.zenzxz.my.id/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res?.download_url },
      { api: 'ZenzzXD v2', endpoint: `https://api.zenzxz.my.id/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res?.download_url },
      { api: 'Vreden', endpoint: `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res?.result?.download?.url },
      { api: 'Delirius', endpoint: `https://api.delirius.my.id/download/ymp3?url=${encodeURIComponent(url)}`, extractor: res => res?.data?.download?.url },
      { api: 'StarVoid', endpoint: `https://api.starvoidclub.xyz/download/youtube?url=${encodeURIComponent(url)}`, extractor: res => res?.audio }
    ]

    let audioUrl, apiUsada, exito = false

    for (let fuente of fuentes) {
      try {
        const response = await fetch(fuente.endpoint)
        if (!response.ok) continue
        const data = await response.json()
        const link = fuente.extractor(data)
        if (link && typeof link === 'string' && link.startsWith('http')) {
          audioUrl = link
          apiUsada = fuente.api
          exito = true
          break
        }
      } catch (err) {
        console.log(`⚠️ Error con ${fuente.api}:`, err.message)
      }
    }

    if (!exito) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
      return conn.reply(m.chat, '💀 Ninguna API resistió el poder del Príncipe Saiyajin. ¡Patético!', m, ctxErr)
    }

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        ptt: false,
        jpegThumbnail: thumbBuffer,
        caption: `
🎧 *${title}*
🔥 Descargado con el orgullo del Príncipe Saiyajin.
🌐 API usada: ${apiUsada}
⚡ "¡Kakarotto, ni tú tienes una playlist así!" ⚡
        `.trim()
      },
      { quoted: m }
    )

    await conn.reply(m.chat, `✅ ¡Descarga completada, insecto! 🎵\n🎶 *${title}*`, m, ctxOk)

  } catch (e) {
    console.error('💀 Error en play:', e)
    await conn.reply(m.chat, `💢 ¡Error, maldito insecto!: ${e.message}`, m, ctxErr)
  }
}

handler.help = ['play <nombre de la canción>']
handler.tags = ['downloader']
handler.command = ['play']

export default handler