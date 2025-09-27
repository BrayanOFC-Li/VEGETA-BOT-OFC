/*creado y editado por BrayanOFC
import { xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

const botname = global.botname || '❍⏤͟͟͞͞𝙑𝙀𝙂𝙀𝙏𝘼-𝙊𝙁𝘾࿐'
const creador = 'BrayanOFC 👻'
const version = '2.13.2' 

let tags = {
  'serbot': 'SUB BOTS',
  'info': 'ZENO INFO',
  'main': 'MENUS INFO'
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    if (!global.db) global.db = {}
    if (!global.db.data) global.db.data = {}
    if (!global.db.data.users) global.db.data.users = {}

    let userId = m.mentionedJid?.[0] || m.sender
    let user = global.db.data.users[userId] || { exp: 0, level: 1, premium: false }


    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium,
    }))


    let menuText = `
╔═✪〘 🚀 GALACTIC MISSION REPORT 🚀 〙✪═╗
║ 🐉 Unidad: ${botname}
║ 👤 Creador: ${creador}
║ 🌌 Modo: ${global.opts?.self ? 'Privado' : 'Público'}
║ 🔥 Nivel de Energía: ${user.exp}
║ 🚀 Versión: ${version}
║ 🛠️ Protocolos Disponibles: ${Object.keys(global.plugins).length}
╚════════════════════════════════════╝

🚀╔═ *SECCIÓN DE MENÚS* ═╗🚀
${Object.keys(tags).map(tag => {
  const commandsForTag = help.filter(menu => menu.tags.includes(tag))
  if (commandsForTag.length === 0) return ''
  let section = `
╔═══〔${tags[tag]} ${getRandomEmoji()}〕═══╗
${commandsForTag.map(menu => menu.help.map(help =>
  `║ ☁️${_p}${help}${menu.limit ? ' 🟡' : ''}${menu.premium ? ' 🔒' : ''}`
).join('\n')).join('\n')}
╚═════════════════════╝`
  return section
}).filter(text => text !== '').join('\n')}

 👑 © Powered by ${creador}
`.trim()

    // Reacción estilo Vegeta
    await conn.sendMessage(m.chat, { react: { text: '🐉', key: m.key } })

    // Envío con video estilo Itsuki
    let vidBuffer = await (await fetch('https://files.catbox.moe/nl3zrv.mp4')).buffer()
    await conn.sendMessage(m.chat, {
      video: vidBuffer,
      gifPlayback: true,
      caption: menuText,
      ...global.rcanalden2
    }, { quoted: m })

  } catch (e) {
    await conn.sendMessage(m.chat, { text: `✖️ Error en menú Vegeta:\n${e}` }, { quoted: m })
    console.error(e)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'allmenu', 'menú']
export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000) 
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  let texto = []
  if (d > 0) texto.push(`${d} ${d == 1 ? 'día' : 'días'}`)
  if (h > 0) texto.push(`${h} ${h == 1 ? 'hora' : 'horas'}`)
  if (m > 0) texto.push(`${m} ${m == 1 ? 'minuto' : 'minutos'}`)
  if (s > 0) texto.push(`${s} ${s == 1 ? 'segundo' : 'segundos'}`)
  return texto.length ? texto.join(', ') : '0 segundos'
}

function getRandomEmoji() {
  const emojis = ['🐉', '🎆', '⚡', '🔥', '🌌', '💥']
  return emojis[Math.floor(Math.random() * emojis.length)]
}*/





//Creador del menu: BrayanOFC
import { xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

const botname = global.botname || '🌸 𝐈𝐓𝐒𝐔𝐊𝐈 𝐍𝐀𝐊𝐀𝐍𝐎-𝐀𝐈 🌸'
const creador = '𝗟𝗲𝗼  𝘅𝘇𝘀𝘆 ⚡'
const version = 'BETA' 

let tags = {
  'serbot': '❤️‍🩹 𝗦𝗨𝗕-𝗕𝗢𝗧𝗦',
  'info': '🌸 𝗜𝗡𝗙𝗢𝗦',
  'main': '💋 𝗠𝗘𝗡𝗨',
  'nable': '🌀 𝗠𝗢𝗗𝗢 𝗔𝗩𝗔𝗡𝗭𝗔𝗗𝗢',
  'cmd': '📝 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦',
  'advanced': '🌟 𝗙𝗨𝗡𝗖𝗜𝗢𝗡𝗘𝗦',
  'game': '💫 𝗝𝗨𝗘𝗚𝗢𝗦',
  'rpg': '⚔️ 𝗥𝗣𝗚',
  'group': '🌼 𝗚𝗥𝗨𝗣𝗢𝗦',
  'downloader': '👒 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦',
  'sticker': '🎀 𝗦𝗧𝗜𝗖𝗞𝗘𝗥',
  'audio': '🫧 𝗔𝗨𝗗𝗜𝗢',
  'search': '🪞 𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔',
  'tools': '🧰 𝗛𝗘𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦',
  'fun': '💃 𝗗𝗜𝗩𝗘𝗥𝗦𝗜𝗢𝗡',
  'anime': '🪭 𝗔𝗡𝗜𝗠𝗘',
  'premium': '💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠',
  'social': '📸 𝗥𝗘𝗗𝗘𝗦',
  'custom': '📕 𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟'
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    if (!global.db) global.db = {}
    if (!global.db.data) global.db.data = {}
    if (!global.db.data.users) global.db.data.users = {}

    let userId = m.mentionedJid?.[0] || m.sender
    let user = global.db.data.users[userId] || { exp: 0, level: 1, premium: false }

    let totalPremium = Object.values(global.db.data.users).filter(u => u.premium).length

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium,
    }))

    let date = new Date()
    let time = date.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    })

    let hour = date.getHours()
    let saludo = '🌃 Buenas noches'
    if (hour >= 5 && hour < 12) saludo = '🌄 Buenos días'
    else if (hour >= 12 && hour < 19) saludo = '🌅 Buenas tardes'

    let uptime = clockString(process.uptime() * 1000)

    let menuText = `
╭━━━〔 🌸 *ITSUKI NAKANO-AI MENU* 🌸 〕━━━⬣
┃ 🫧 *Nombre*: *${botname}*
┃ 👑 *Creador*: *${creador}*
┃ 💕 *Uptime*: *${uptime}*
┃ 💎 *Premium*: *${totalPremium}*
┃ 💖 *Versión*: *${version}*
┃ ⏰️ *Hora*: *${time}*
┃ 💗 *Saludo*: *${saludo}*
╰━━━━━━━━━━━━━━━━━━━━━━⬣
`

    for (let tag in tags) {
      let comandos = help.filter(menu => menu.tags.includes(tag))
      if (!comandos.length) continue

      menuText += `
╭━━━〔 ${tags[tag]} 〕━━━⬣
${comandos.map(menu => menu.help.map(cmd =>
  `┃ 🌸 ${_p}${cmd}${menu.limit ? ' 💋' : ''}${menu.premium ? ' 🙈' : ''}`
).join('\n')).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━━━⬣
`
    }

    menuText += `🌷 Powered by *${creador}* 👑`

    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key } })

    let vidBuffer = await (await fetch('https://files.catbox.moe/nl3zrv.mp4')).buffer()
    await conn.sendMessage(m.chat, {
      video: vidBuffer,
      gifPlayback: true,
      caption: menuText,
      ...global.rcanalden2
    }, { quoted: m })

  } catch (e) {
    await conn.sendMessage(m.chat, { text: `❌ Error en el menú:\n${e}` }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menunakano', 'menú']
export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000) 
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  let texto = []
  if (d > 0) texto.push(`${d} ${d == 1 ? 'día' : 'días'}`)
  if (h > 0) texto.push(`${h} ${h == 1 ? 'hora' : 'horas'}`)
  if (m > 0) texto.push(`${m} ${m == 1 ? 'minuto' : 'minutos'}`)
  if (s > 0) texto.push(`${s} ${s == 1 ? 'segundo' : 'segundos'}`)
  return texto.length ? texto.join(', ') : '0 segundos'
}