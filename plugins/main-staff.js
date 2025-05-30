let handler = async (m, { conn, usedPrefix }) => {
    const menu = `
👥 *COLABORADORES DEL BOT* 👥

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🎖️ *CREADOR PRINCIPAL* 🎖️
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

👑 **CREADOR DEL BOT**
┌─────────────────────────┐
│ 📱 +52 418 145 0063      
│ 🌐 github.com/Fer280809  
│ ⭐ *Rol:* Fundador y Creador
└─────────────────────────┘

🤖 **ASTA_BOT FERNANDO**
┌─────────────────────────┐
│ 📱 +52 746 117 7130      
│ 🎯 *Rol:* Bot oficial del creador
└─────────────────────────┘

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔥 *EQUIPO DE DESARROLLADORES* 🔥
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

🚀 **JAVI**
┌─────────────────────────┐
│ 📱 +52 664 786 8496      
│ 🌐 github.com/javi16-art 
│ ⚡ *Especialidad:* Desarrollo de comandos
└─────────────────────────┘

🎨 **PABLO**
┌─────────────────────────┐
│ 📱 +51 907 512 473       
│ 🌐 github.com/Erickztone
│ 🎭 *Especialidad:* Centro de creación de personajes
└─────────────────────────┘

🤝 **NOSE**
┌─────────────────────────┐
│ 📱 +51 927 917 562       
│ 👑 *Especialidad:* Mano derecha del creador
└─────────────────────────┘

📢 **PAUL**
┌─────────────────────────┐
│ 📱 +593 98 544 0092      
│ 🌐 github.com/PAYASOBOT24
│ 🎪 *Especialidad:* Publicidad
└─────────────────────────┘

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🌟 *RESUMEN DEL EQUIPO* 🌟
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*📊 Estadísticas del equipo:*
• 👑 1 Creador principal
• 🤖 1 Bot oficial
• 💻 4 Desarrolladores especializados

*🌍 Cobertura internacional:*
• 🇲🇽 México - Creador, Asta_bot y Javi
• 🇵🇪 Perú - Nose y Pablo
• 🇪🇨 Ecuador - Paul

*⚡ Especialidades del equipo:*
• Desarrollo de comandos
• Creación de personajes
• Administración avanzada
• Marketing y publicidad

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💎 *MENSAJE DEL EQUIPO* 💎
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*🎉 ¡Gracias por usar nuestro bot!*
*Cada uno de nosotros trabaja con dedicación*
*para ofrecerte la mejor experiencia posible* ✨

*🚀 Nuestro compromiso:*
• Innovación constante
• Soporte de calidad 24/7
• Comunidad unida y activa
• Desarrollo colaborativo

_Desarrollado con ❤️ por todo el equipo de desarrolladores_

╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚀 *¿QUIERES SER DESARROLLADOR?* 🚀
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*💡 ¡Únete a nuestro equipo de desarrollo!*

*📝 Para aplicar como desarrollador:*
• Responde nuestro cuestionario oficial
• Enlace: https://surveyheart.com/form/6835fa3f543db626e9bdd8a2

*⚠️ IMPORTANTE:*
• 📋 Proporciona información **REAL** y completa
• 📞 El creador se pondrá en contacto contigo
• ✅ Revisamos cada respueta que se evia cuidadosamente
• 🎯 Buscamos personas comprometidas y talentosas

*🌟 Lo que valoramos:*
• Experiencia en programación
• Creatividad e innovación
• Trabajo en equipo
• Compromiso con el proyecto
    `
    m.reply(menu)
}

handler.tags = ['info', 'staff']
handler.help = ['colaboradores', 'staff', 'equipo']
handler.command = ['colaboradores', 'staff', 'equipo', 'team', 'devs']
handler.group = false

export default handler

