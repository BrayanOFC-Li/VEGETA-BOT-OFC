import os from 'os';

let handler = async (m, { conn }) => {
  try {
    const start = Date.now();

    await conn.reply(m.chat, '*🚀 Reiniciando bot...*', m, rcanalr);

    await new Promise(resolve => setTimeout(resolve, 3000));

    process.exit(0);
  } catch (error) {
    console.error('[ERROR][REINICIO]', error);
    await conn.reply(m.chat, `❌ Error\n${error.message || error}`, m, rcanalden2);
  }
};

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];
handler.rowner = true;

export default handler;