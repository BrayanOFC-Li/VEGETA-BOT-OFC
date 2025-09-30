import ytdl from 'ytdl-core'
import fs from 'fs'
import path from 'path'

const ytmp3 = async (m, { conn, args }) => {
  if (!args[0]) throw '❗ Ingresa un link de YouTube'
  const url = args[0]
  if (!ytdl.validateURL(url)) throw '❗ Link no válido'

  m.react('⏳')
  const filePath = path.join('./tmp', `${Date.now()}.mp3`)
  const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' })
  stream.pipe(fs.createWriteStream(filePath)).on('finish', async () => {
    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(filePath),
      mimetype: 'audio/mpeg',
      fileName: 'audio.mp3'
    }, { quoted: m })
    fs.unlinkSync(filePath)
    m.react('✅')
  })
}

const ytmp4 = async (m, { conn, args }) => {
  if (!args[0]) throw '❗ Ingresa un link de YouTube'
  const url = args[0]
  if (!ytdl.validateURL(url)) throw '❗ Link no válido'

  m.react('⏳')
  const filePath = path.join('./tmp', `${Date.now()}.mp4`)
  const stream = ytdl(url, { filter: 'videoandaudio', quality: '18' }) // 360p
  stream.pipe(fs.createWriteStream(filePath)).on('finish', async () => {
    await conn.sendMessage(m.chat, {
      video: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: 'video.mp4'
    }, { quoted: m })
    fs.unlinkSync(filePath)
    m.react('✅')
  })
}

const ytmp3doc = async (m, { conn, args }) => {
  if (!args[0]) throw '❗ Ingresa un link de YouTube'
  const url = args[0]
  if (!ytdl.validateURL(url)) throw '❗ Link no válido'

  m.react('⏳')
  const filePath = path.join('./tmp', `${Date.now()}.mp3`)
  const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' })
  stream.pipe(fs.createWriteStream(filePath)).on('finish', async () => {
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(filePath),
      mimetype: 'audio/mpeg',
      fileName: 'audio.mp3'
    }, { quoted: m })
    fs.unlinkSync(filePath)
    m.react('✅')
  })
}

const ytmp4doc = async (m, { conn, args }) => {
  if (!args[0]) throw '❗ Ingresa un link de YouTube'
  const url = args[0]
  if (!ytdl.validateURL(url)) throw '❗ Link no válido'

  m.react('⏳')
  const filePath = path.join('./tmp', `${Date.now()}.mp4`)
  const stream = ytdl(url, { filter: 'videoandaudio', quality: '18' })
  stream.pipe(fs.createWriteStream(filePath)).on('finish', async () => {
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: 'video.mp4'
    }, { quoted: m })
    fs.unlinkSync(filePath)
    m.react('✅')
  })
}

export const commands = [
  { command: ['ytmp3'], handler: ytmp3 },
  { command: ['ytmp4'], handler: ytmp4 },
  { command: ['ytmp3doc'], handler: ytmp3doc },
  { command: ['ytmp4doc'], handler: ytmp4doc }
]