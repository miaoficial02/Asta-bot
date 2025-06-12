import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'
import os from 'os'

let handler = async (m, { conn }) => {
  // Medir latencia
  let timestamp = speed();
  let latensi = speed() - timestamp;
  
  // Información del sistema
  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let child = stdout.toString("utf-8");
    let ssd = child.replace(/Memory:/, "Ram:");
    
    // Información adicional
    const uptime = formatTime(os.uptime());
    const cpuUsage = os.loadavg()[0].toFixed(2);
    const memoryUsed = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);
    const totalMemory = os.totalmem() / (1024 * 1024 * 1024);
    const memoryPercent = ((memoryUsed / totalMemory) * 100).toFixed(2);
    
    // Añadir emojis y estilos
    let pingMessage = `
 🚀 *PING* 🚀 
┃
 ⏱️ *Latencia:* ${latensi.toFixed(2)}ms
 🔄 *Tiempo activo:* ${uptime}
 
 🤖 *¡Bot listo para servirte!* ✨

`;

    conn.reply(m.chat, pingMessage, m);
  });
}

// Función para formatear el tiempo
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours}h ${minutes}m ${secs}s`;
}

handler.help = ['ping', 'speed']
handler.tags = ['info']
handler.command = ['ping', 'p', 'speed']
handler.register = true

export default handler
