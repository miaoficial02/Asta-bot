import { exec } from 'child_process'
import util from 'util'
const execAsync = util.promisify(exec)

let handler = async (m, { conn }) => {
  await m.reply('⏳ Buscando actualizaciones en el repositorio, espera...')

  try {
    // Forzar actualización desde la rama principal (main)
    let { stdout: fetchOut, stderr: fetchErr } = await execAsync('git fetch --all', { cwd: process.cwd() })
    let { stdout: resetOut, stderr: resetErr } = await execAsync('git reset --hard origin/main', { cwd: process.cwd() })

    // Verifica si npm está instalado
    let npmExists = true
    try {
      await execAsync('npm -v')
    } catch {
      npmExists = false
    }

    let npmMsg = 'npm no está instalado o no está en el PATH, omitiendo instalación de dependencias.'
    if (npmExists) {
      let { stdout: npmOut, stderr: npmErr } = await execAsync('npm install', { cwd: process.cwd() })
      npmMsg = npmOut || npmErr
    }

    await m.reply(
      `✅ Bot ACTUALIZADO correctamente desde GitHub.\n\n` +
      `*GIT FETCH:*\n${fetchOut || fetchErr}\n` +
      `*GIT RESET:*\n${resetOut || resetErr}\n` +
      `*NPM INSTALL:*\n${npmMsg}`
    )

    if (global.db && global.db.write) await global.db.write()
    await m.reply('♻️ Reiniciando el bot para aplicar los cambios...')
    if (process.send) process.send('reset')
    else await m.reply('⚠️ El bot debe reiniciarse manualmente (usa pm2, npm restart, o vuelve a iniciar el proceso).')
  } catch (e) {
    await m.reply('❌ Error al actualizar:\n' + (e.stderr || e.message || e))
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update']
handler.rowner = true

export default handler

export default handler;
