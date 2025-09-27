import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
  }

  async function getRandomChannel() {
    let randomIndex = Math.floor(Math.random() * canalIdM.length)
    let id = canalIdM[randomIndex]
    let name = canalNombreM[randomIndex]
    return { id, name }
  }

  global.getBuffer = async function getBuffer(url, options) {
    try {
      options ? options : {}
      var res = await axios({
        method: "get",
        url,
        headers: {
          'DNT': 1,
          'User-Agent': 'GoogleBot',
          'Upgrade-Insecure-Request': 1
        },
        ...options,
        responseType: 'arraybuffer'
      })
      return res.data
    } catch (e) {
      console.log(`Error : ${e}`)
    }
  }

  global.creador = 'Wa.me/526641784469'
  global.ofcbot = `${conn?.user?.jid?.split('@')[0] || ''}`
  global.asistencia = 'Wa.me/526641784469'
  global.namechannel = '🌸 Team BrayanOFC 🌸'
  global.namegrupo = '👻 BrayanOFC'
  global.namecomu = '𝗖𝗼𝗺𝘂𝗻𝗶𝗱𝗮𝗱 ✨ BrayanOFC Nexus'
  global.listo = '⚔️ *Aquí tienes crack*'

  global.canalIdM = ["120363307694217288@newsletter", "120363301234567890@newsletter"]
  global.canalNombreM = ["🌸 Team BrayanOFC Nexus", "✨ Nexus Oficial"]
  global.idchannel = canalIdM[0]
  global.channelRD = await getRandomChannel()

  global.d = new Date(Date.now() + 3600000)
  global.locale = 'es'
  global.dia = global.d.toLocaleDateString(global.locale, { weekday: 'long' })
  global.fecha = global.d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
  global.mes = global.d.toLocaleDateString('es', { month: 'long' })
  global.año = global.d.toLocaleDateString('es', { year: 'numeric' })
  global.tiempo = global.d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

  global.rwait = '⏳'
  global.done = '✅'
  global.error = '✖️'

  global.emoji = '🐉'
  global.emoji2 = '👻'
  global.emoji3 = '👑'
  global.emoji4 = '🩸'
  global.emojis = pickRandom([global.emoji, global.emoji2, global.emoji3, global.emoji4])

  var canal = 'https://whatsapp.com/channel/0029Vai28FR7dmea9gytQm3w'  
  var git = 'https://github.com/BrayanOFC' 
  var github = 'https://github.com/BrayanOFC/VEGETA-BOT-MB' 
  global.redes = pickRandom([canal, git, github])

  global.icono = pickRandom([
    'https://files.catbox.moe/flpxgg.jpg',
    'https://files.catbox.moe/tze2i9.jpg',
    'https://files.catbox.moe/2v7j6r.jpg',
    'https://files.catbox.moe/8bk08z.jpg'
  ])

  let category = "imagen"
  const db = './src/database/db.json'
  const db_ = JSON.parse(fs.readFileSync(db))
  const random = Math.floor(Math.random() * db_.links[category].length)
  const randomlink = db_.links[category][random]
  const response = await fetch(randomlink)
  const rimg = await response.buffer()
  global.icons = rimg

  var ase = new Date()
  var hour = ase.getHours()
  switch (hour) {
    case 0: case 1: case 2: hour = 'Linda noche 🌃'; break;
    case 3: case 4: case 5: case 6: hour = 'Linda mañana 🌄'; break;
    case 7: hour = 'Linda mañana 🌅'; break;
    case 8: case 9: hour = 'Linda mañana 🌄'; break;
    case 10: case 11: case 12: case 13: hour = 'Lindo día 🌤'; break;
    case 14: case 15: case 16: case 17: hour = 'Linda tarde 🌆'; break;
    default: hour = 'Linda noche 🌃'
  }
  global.saludo = hour

  global.nombre = m.pushName || 'Anónimo'
  global.taguser = '@' + m.sender.split("@s.whatsapp.net")
  var more = String.fromCharCode(8206)
  global.readMore = more.repeat(850)

  global.fkontak = { key: { participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${nombre}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${nombre},;;;\nFN:${nombre},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': null, thumbnail: null, sendEphemeral: true } } }

  global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }, quoted: m } }

  global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name }, externalAdReply: { showAdAttribution: true, title: "👻 Team BrayanOFC Nexus", body: "𝗕𝗿𝗮𝘆𝗮𝗻𝗢𝗙𝗖 👻", mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, } }

}

export default handler  