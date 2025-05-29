// ====== CONFIGURACIÓN DE OWNERS ======
// Owners Permanentes (solo estos pueden agregar y quitar permanentes)
const CORE_PERMANENT_OWNERS = [
  ['524181450063', '𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔 Creador 🜲', true],
  ['527461177130', 'ASTA_BOT', true],
];

// Lista de Owners Permanentes (puede crecer)
let FIXED_OWNERS = [
  ...CORE_PERMANENT_OWNERS,
  ['5216631079388', 'neykor 🜲', true],
  ['5214181491264', 'fernando 2', true],
];

// Puedes poner aquí manualmente tu lista de owners EXTRA (se sumarán a los fijos)
// Formato: [numero (string), nombre (string), false]
const EXTRA_OWNERS = [
  // Ejemplo: ['521234567890', 'Nombre opcional', false],
];

// Inicializa global.owner SIEMPRE con los fijos y luego suma los extras SIN duplicados
if (!global.owner) global.owner = [];
for (const o of FIXED_OWNERS) {
  if (!global.owner.some(x => x[0] === o[0])) global.owner.push(o);
}
for (const o of EXTRA_OWNERS) {
  if (!global.owner.some(x => x[0] === o[0])) global.owner.push(o);
}

// Utilidad: ¿es owner permanente CORE?
function isCorePermanentOwner(jid) {
  jid = jid.replace(/[^0-9]/g, '');
  return CORE_PERMANENT_OWNERS.some(x => x[0] === jid);
}

// Utilidad: ¿es owner permanente (puede crecer)?
function isPermanentOwner(jid) {
  jid = jid.replace(/[^0-9]/g, '');
  return FIXED_OWNERS.some(x => x[0] === jid);
}

// Utilidad para saber si alguien es owner (permanente o extra)
function isOwner(jid) {
  jid = jid.replace(/[^0-9]/g, '');
  return global.owner.some(o => o[0] === jid);
}

// Utilidad para obtener toda la lista de owners (fijos + extras)
function getOwnersList() {
  return global.owner.map(o =>
    `• ${o[1] ? o[1] : '(Sin nombre)'}\n\t${o[0]}${o[2] ? ' (permanente)' : ''}`
  ).join('\n');
}

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const emoji = '🛡️';
  const emoji2 = '🗑️';
  const why = `${emoji} Por favor, menciona a un usuario para agregar o quitar como owner.`;
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : text
    ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    : false;

  const senderNum = m.sender.replace(/[^0-9]/g, '');

  // Comando para mostrar owners (cualquier owner puede ver)
  if (command === 'owners') {
    if (!isOwner(senderNum)) {
      await conn.reply(m.chat, '⛔ Solo los owners pueden usar este comando.', m, { mentions: [m.sender] });
      return;
    }
    await conn.reply(
      m.chat,
      `👑 *Lista de Owners* 👑\n\n${getOwnersList()}`,
      m
    );
    return;
  }

  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] });
  const num = who.replace(/[^0-9]/g, '');

  // Comandos para owners normales (agregar y quitar owners extra)
  if (command === 'addowner' || command === 'delowner') {
    if (!isOwner(senderNum)) {
      await conn.reply(m.chat, '⛔ Solo los owners pueden usar este comando.', m, { mentions: [m.sender] });
      return;
    }
    if (command === 'addowner') {
      if (global.owner.some(x => x[0] === num)) {
        await conn.reply(m.chat, `${emoji} El usuario ya es owner.`, m);
        return;
      }
      global.owner.push([num, '', false]);
      await conn.reply(
        m.chat,
        `${emoji} Listo. El usuario ${num} ya está en la lista de owners.\n\n${getOwnersList()}`,
        m
      );
    }
    if (command === 'delowner') {
      if (isPermanentOwner(num)) {
        await conn.reply(
          m.chat,
          `${emoji2} No puedes eliminar un owner permanente del sistema con este comando.`,
          m
        );
        return;
      }
      const idx = global.owner.findIndex(x => x[0] === num);
      if (idx !== -1) {
        global.owner.splice(idx, 1);
        await conn.reply(
          m.chat,
          `${emoji2} Eliminado el número de la lista de owners correctamente.\n\n${getOwnersList()}`,
          m
        );
      } else {
        await conn.reply(m.chat, `${emoji2} El número no está en la lista de owners.`, m);
      }
    }
    return;
  }

  // Comandos para owners permanentes CORE (agregar y quitar owners permanentes)
  if (command === 'addownerpermanente' || command === 'delownerpermanente') {
    if (!isCorePermanentOwner(senderNum)) {
      await conn.reply(m.chat, '⛔ Solo los owners principales pueden usar este comando.', m, { mentions: [m.sender] });
      return;
    }
    if (command === 'addownerpermanente') {
      if (isPermanentOwner(num)) {
        await conn.reply(m.chat, `${emoji} El usuario ya es owner permanente.`, m);
        return;
      }
      FIXED_OWNERS.push([num, '', true]);
      if (!global.owner.some(x => x[0] === num)) global.owner.push([num, '', true]);
      await conn.reply(
        m.chat,
        `${emoji} Listo. El usuario ${num} ya es owner permanente.\n\n${getOwnersList()}`,
        m
      );
    }
    if (command === 'delownerpermanente') {
      if (isCorePermanentOwner(num)) {
        await conn.reply(m.chat, `${emoji2} No puedes quitar a un owner principal del sistema.`, m);
        return;
      }
      const idxF = FIXED_OWNERS.findIndex(x => x[0] === num);
      if (idxF !== -1) FIXED_OWNERS.splice(idxF, 1);
      const idxG = global.owner.findIndex(x => x[0] === num);
      if (idxG !== -1) global.owner.splice(idxG, 1);
      await conn.reply(
        m.chat,
        `${emoji2} Eliminado el número de la lista de owners permanentes correctamente.\n\n${getOwnersList()}`,
        m
      );
    }
    return;
  }
};

handler.command = ['addowner', 'delowner', 'owners', 'addownerpermanente', 'delownerpermanente'];
handler.rowner = false;
handler.owner = false;
handler.admin = false;
handler.group = false;

export default handler;
