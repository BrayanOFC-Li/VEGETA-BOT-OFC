// creado y editado por BrayanOFC
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const creador = 'BrayanOFC 👻';

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let nsfwHelp = Object.values(global.plugins)
      .filter(p => p?.tags?.includes('nsfw') && !p.disabled)
      .map(p => {
        let helpText = Array.isArray(p.help) ? p.help[0] : p.help;
        return `🔞 ${_p}${helpText}`;
      })
      .join('\n');

    let menuText = `
╭━━━『🔞 NSFW 』━━━╮
┃ 🔥 Aquí tienes los comandos NSFW
┃ 💥 Usa con responsabilidad
╰━━━━━━━━━━━━━━━━━━━━━━╯

${nsfwHelp}

${creador}
`.trim()

    await m.react('🔞')

    let imgBuffer = await (await fetch('https://files.catbox.moe/vs2w90.jpg')).buffer()
    let media = await prepareWAMessageMedia({ image: imgBuffer }, { upload: conn.waUploadToServer })
 
    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          imageMessage: {
            ...media.imageMessage,
            caption: menuText,
            ...global.rcanalden2
          }
        }
      }
    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    conn.reply(m.chat, `✖️ Menú NSFW falló.\n\n${e}`, m)
    console.error(e)
  }
}

handler.help = ['menunsfw']
handler.tags = ['main']
handler.command = ['menunsfw', 'menuerotico']
handler.register = true

export default handler