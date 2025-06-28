let handler = async (m, { conn, command, isGroup, isAdmin, botAdmin }) => {
  if (!isGroup) return m.reply('❌ Este comando solo funciona en grupos.')
  if (!botAdmin) return m.reply('❌ Necesito ser admin para cambiar la configuración.')
  if (!isAdmin) return m.reply('❌ Necesitas ser admin para usar este comando.')

  let setting = null
  if (command === 'open') {
    setting = 'not_announcement' // grupo abierto
  } else if (command === 'close') {
    setting = 'announcement' // grupo cerrado
  }

  if (!setting) return

  await conn.groupSettingUpdate(m.chat, setting)
  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = /^(open|close)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
