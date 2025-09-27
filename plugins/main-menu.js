//creado y editado por BrayanOFC
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
║ 🔥 Nivel de Energía: ${exp}
║ 📿 Versión del Bot: ${version}
║ ⏱️ Tiempo de Operación: ${uptime}
║ 🛠️ Protocolos Disponibles: ${totalCommands}
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

    await conn.sendMessage(m.chat, { react: { text: '🐉', key: m.key } })

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

function getRandomEmoji() {
  const emojis = ['🐉', '🎆', '⚡', '🔥', '🌌', '💥']
  return emojis[Math.floor(Math.random() * emojis.length)]
}