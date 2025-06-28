const handler = async (m, { conn, command }) => {
  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = /^open|close$/i
handler.owner = false
handler.admin = false

export default handler
