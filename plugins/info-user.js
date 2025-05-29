let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Solo los owners permanentes pueden usarlo
  const PERMANENT_OWNERS = [
    '524181450063', // 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔 Creador 🜲
    '527461177130', // ASTA_BOT
    '5216631079388', // neykor 🜲
    '5214181491264', // fernando 2
    // Agrega aquí más si los tienes en FIXED_OWNERS
  ]
  let senderNum = m.sender.replace(/[^0-9]/g, '')
  if (!PERMANENT_OWNERS.includes(senderNum)) {
    return m.reply('⛔ Solo los owners permanentes pueden usar este comando.')
  }

  let number = args[0] ? args[0].replace(/[^0-9]/g, '') : m.sender.split('@')[0]
  let userId = number + '@s.whatsapp.net'
  let user = global.db.data.users[userId]
  if (!user) return m.reply('❌ No se encontró información para ese usuario.')

  // Mostrar toda la información que tenga el usuario
  let info = [
    `👤 *Información completa del usuario*`,
    `• Número: wa.me/${number}`,
    `• Nombre: ${user.name || 'Sin nombre'}`,
    `• Dinero: ${user.money ?? 0}`,
    `• Exp: ${user.exp ?? 0}`,
    `• Nivel: ${user.level ?? 0}`,
    `• Rol: ${user.role || 'Sin rol'}`,
    `• Premium: ${user.premium ? 'Sí' : 'No'}`,
    `• Registrado: ${user.registered ? 'Sí' : 'No'}`,
    `• Último comando: ${user.lastCommand || 'N/A'}`,
    `• Comandos usados: ${user.cmd || 0}`,
    `• Baneado: ${user.banned ? 'Sí' : 'No'}`,
    `• Advertencias: ${user.warn || 0}`,
    `• Fecha registro: ${user.regTime ? new Date(user.regTime).toLocaleString() : 'N/A'}`,
    `• Edad: ${user.age || 'N/A'}`,
    `• Genero: ${user.gender || 'N/A'}`,
    `• Invitador: ${user.registrar || 'N/A'}`,
    `• Estado: ${user.status || 'N/A'}`,
    `• Frase: ${user.phrase || 'N/A'}`,
    `• Inventario: ${user.inventory ? JSON.stringify(user.inventory, null, 1) : 'N/A'}`,
    // Si tienes más campos, añádelos aquí
  ].join('\n')

  m.reply(info)
}
handler.help = ['userinfo <número>']
handler.tags = ['info','tools']
handler.command = ['userinfo', 'infouser', 'buscaruser', 'datosuser']
handler.group = false

export default handler
