const {
.promote
.demote

╚════════════════╝
        `
      })
    }

    // TAG ALL
    if (body === '.tagall') {
      let teks = '📢 TAG ALL\n\n'

      let mentions = []

      for (let member of groupData.participants) {
        teks += `@${member.id.split('@')[0]}\n`
        mentions.push(member.id)
      }

      return sock.sendMessage(from, {
        text: teks,
        mentions
      })
    }

    // HIDETAG
    if (body.startsWith('.hidetag')) {
      const text = body.replace('.hidetag', '').trim()

      let mentions = groupData.participants.map(v => v.id)

      return sock.sendMessage(from, {
        text: text || 'Pesan admin',
        mentions
      })
    }

    // KICK
    if (body.startsWith('.kick')) {
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid

      if (!mentioned) {
        return sock.sendMessage(from, {
          text: 'Tag member yang ingin dikick'
        })
      }

      await sock.groupParticipantsUpdate(from, mentioned, 'remove')

      return sock.sendMessage(from, {
        text: '✅ Member berhasil dikick'
      })
    }

    // PROMOTE
    if (body.startsWith('.promote')) {
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid

      if (!mentioned) {
        return sock.sendMessage(from, {
          text: 'Tag member yang ingin dijadikan admin'
        })
      }

      await sock.groupParticipantsUpdate(from, mentioned, 'promote')

      return sock.sendMessage(from, {
        text: '✅ Member berhasil dijadikan admin'
      })
    }

    // DEMOTE
    if (body.startsWith('.demote')) {
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid

      if (!mentioned) {
        return sock.sendMessage(from, {
          text: 'Tag admin yang ingin diturunkan'
        })
      }

      await sock.groupParticipantsUpdate(from, mentioned, 'demote')

      return sock.sendMessage(from, {
        text: '✅ Admin berhasil diturunkan'
      })
    }
  })
}

startBot()
