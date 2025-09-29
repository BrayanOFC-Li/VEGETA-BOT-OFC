import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `🐉 Ingresa un texto para buscar en YouTube.\n> *Ejemplo:* ${usedPrefix + command} Shakira`, m);

    await m.react('🕓');
    try {
        let searchResults = await searchVideos(args.join(" "));

        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults[0];
        let thumbnail = await (await fetch(video.miniatura)).buffer();

        let messageText = `*Youtube - Download*\n\n`;
        messageText += `🎵 *Título:* ${video.titulo}\n`;
        messageText += `⌛ *Duración:* ${video.duracion || 'No disponible'}\n`;
        messageText += `👤 *Autor:* ${video.canal || 'Desconocido'}\n`;
        messageText += `📆 *Publicado:* ${convertTimeToSpanish(video.publicado)}\n`;
        messageText += `🖇️ *Url:* ${video.url}\n`;

        await conn.sendMessage(m.chat, {
            image: thumbnail,
            caption: messageText,
            footer: `𝖯𑄜𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 BrayanOFC☁️`,
            buttons: [
                {
                    buttonId: `${usedPrefix}ytmp3 ${video.url}`,
                    buttonText: { displayText: '🎵 Descargar Audio' },
                    type: 1,
                },
                {
                    buttonId: `${usedPrefix}ytmp4 ${video.url}`,
                    buttonText: { displayText: '🎬 Descargar Video' },
                    type: 1,
                }
            ],
            headerType: 4,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: video.titulo,
                    body: "YouTube Downloader",
                    thumbnailUrl: video.miniatura,
                    sourceUrl: video.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*`Error al buscar el video.`*', m);
    }
};

handler.help = ['play','play2'];
handler.tags = ['descargas'];
handler.command = ['play','play2'];
export default handler;

function convertTimeToSpanish(timeText) {
    return timeText
        .replace(/year/, 'año').replace(/years/, 'años')
        .replace(/month/, 'mes').replace(/months/, 'meses')
        .replace(/day/, 'día').replace(/days/, 'días')
        .replace(/hour/, 'hora').replace(/hours/, 'horas')
        .replace(/minute/, 'minuto').replace(/minutes/, 'minutos');
}