function setMyCommands(commands) {
  if (commands==undefined) {
    commands = [
      {"command": "/start", "description": "show start message"},
      {"command": "/help", "description": "show help message"},
      {"command": "/admin", "description": "show admin ID"},
    ]
  }
  let data = {
        method: "post",
        payload: {
          method: "setMyCommands",
          commands: JSON.stringify(commands),
        }
      };
      UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

function setMessageReaction(chat_id, message_id, reaction, is_big=true) {
  if (reaction==undefined) {
    reaction = [{"type": "emoji", "emoji": "❤️"}]
  }
  /*
  "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡"
*/
  let data = {
        method: "post",
        payload: {
          method: "setMessageReaction",
          chat_id: String(chat_id),
          message_id: message_id,
          is_big: is_big,
          reaction: JSON.stringify(reaction),


        }
      };
      UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

function getMe() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/getMe");
  console.log(response.getContentText());
}

function close() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/close");
  console.log(response.getContentText());
}

//возвращет строку с примерами оформления текста в сообщении телеграмм
function getFormatsStyles() {
  return `<b>bold</b>, <strong>bold</strong>\n
<i>italic</i>, <em>italic</em>\n
<u>underline</u>, <ins>underline</ins>\n
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>\n
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>\n
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>\n
<a href="http://www.example.com/">inline URL</a>\n
<a href="tg://user?id=123456789">inline mention of a user</a>\n
<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>\n
<code>inline fixed-width code</code>\n
<pre>pre-formatted fixed-width code block</pre>\n
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>\n
<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>\n
<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>`
}

//высылает в чат пользователю примеры оформления текста, 1 соббщением придет пример, вторым код которым этот пример написан.
function sendFormatsStyles(chat_id) {
  let text = getFormatsStyles()
  sendMessage(chat_id, text)
  sendMessageOptionased(chat_id, text, true, true, 'Markdown')
}


function sendChatAction(chat_id, action) {
  let data = {
      method: "post",
      payload: {
        method: "sendChatAction",
        chat_id: String(chat_id),
        action: String(action),

      }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет кубик на ролл emoji_n - номер варианта кубика в массиве
function sendDice(chat_id, emoji_n, disable_notification=false, protect_content=false) {
  sendChatAction(chat_id,'typing')
  let diceMassive = [ '🎲', '🎯', '🏀', '⚽', '🎳', '🎰',];
  let emoji = diceMassive[emoji_n]
  let data = {
      method: "post",
      payload: {
        method: "sendDice",
        chat_id: String(chat_id),
        emoji: String(emoji),
        disable_notification: String(disable_notification),
        protect_content: String(protect_content),
      }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//высылает в чат от 2 до 10 фотографий за раз.
function sendMediaGroup(chat_id, media, type, disable_notification=false, protect_content=false) {
  sendChatAction(chat_id,'upload_photo')
  let array_media = []
  if (media.length>1) {
  for (let med in media) {
    if (med >= 10) {break}
    array_media.push({type: String(type),media: String(media[med]),})
  }
  };
  console.log(JSON.stringify(array_media))
  let data = {
    method: "post",
    payload: {
      method: "sendMediaGroup",
      chat_id: String(chat_id),
      media: JSON.stringify(array_media),
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет фидео в чат
function sendVideoNote(chat_id, videos, caption, keyBoard, disable_notification=false, protect_content=false) {
  sendChatAction(chat_id,'upload_video_note')
  let data = {
    method: "post",
    payload: {
      method: "sendVideoNote",
      chat_id: String(chat_id),
      video_note: String(videos),
      caption: String(caption),
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
      reply_markup: JSON.stringify(keyBoard),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет фидео в чат
function sendVideo(chat_id, video, caption, keyBoard, disable_notification=false, protect_content=false, parse_mode='HTML') {
  sendChatAction(chat_id,'upload_video')
  let data = {
    method: "post",
    payload: {
      method: "sendVideo",
      chat_id: String(chat_id),
      video: String(video),
      caption: String(caption),
      parse_mode: String(parse_mode),
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
      reply_markup: JSON.stringify(keyBoard),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

function sendDocument(chat_id, document, caption, keyBoard, disable_notification=false, protect_content=false, parse_mode='HTML') {
  sendChatAction(chat_id,'upload_document')
  let data = {
    method: "post",
    payload: {
      method: "sendDocument",
      chat_id: String(chat_id),
      document: String(document),
      caption: String(caption),
      parse_mode: String(parse_mode),
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
      reply_markup: JSON.stringify(keyBoard),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет в чат аудио
function sendAudio(chat_id, audio, caption, keyBoard, disable_notification=false, protect_content=false, parse_mode='HTML') {
  sendChatAction(chat_id,'upload_voice')
  let data = {
    method: "post",
    payload: {
      method: "sendAudio",
      chat_id: String(chat_id),
      audio: String(audio),
      caption: String(caption),
      parse_mode: String(parse_mode),
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
      reply_markup: JSON.stringify(keyBoard),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет фотографию в чат
//show_caption_above_media true - надпись будет над фото а не под ним
// false - надпись(caption) под фотографией, по умолчанию
function sendPhoto(chat_id, photo, caption, keyBoard,show_caption_above_media=false, has_spoiler=false, disable_notification=false, protect_content=false, parse_mode='HTML') {
  sendChatAction(chat_id,'upload_photo')
  let data = {
    method: "post",
    payload: {
      method: "sendPhoto",
      chat_id: String(chat_id),
      photo: String(photo),
      caption: String(caption),
      parse_mode: String(parse_mode),
      show_caption_above_media: show_caption_above_media,
      has_spoiler: has_spoiler,
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
      reply_markup: JSON.stringify(keyBoard),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет сообщение
function sendMessage(chat_id, text, keyBoard) {
  sendChatAction(chat_id,'typing')
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//отправляет сообщение с возможностью включения дополнительных опций
//disable_notification false - означает что сообщение придет с уведомлением (звуковым оповещением) true - без уведомления
//protect_content false означает что данное сообщение можно будет еще раз переслать кому то еще. true - данное сообщение будет нельзя пересылать.
function sendMessageOptionased(chat_id, text, disable_notification, protect_content, parse_mode="HTML", keyBoard) {
  sendChatAction(chat_id,'typing')
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: String(parse_mode),
      reply_markup: JSON.stringify(keyBoard),
      disable_notification: String(disable_notification),
      protect_content: String(protect_content),
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//пересылает сообщение по его id из одного чата в другой
//disable_notification false - означает что сообщение придет с уведомлением (звуковым оповещением) true - без уведомления
//protect_content false означает что данное сообщение можно будет еще раз переслать кому то еще. true - данное сообщение будет нельзя пересылать.
function forwardMessage(chat_id, from_chat_id, message_id, disable_notification=false, protect_content=false)  {
  sendChatAction(chat_id,'typing')
  let data = {
      method: "post",
      payload: {
        method: "forwardMessage",
        chat_id: String(chat_id),
        from_chat_id: String(from_chat_id),
        message_id:String(message_id),
        disable_notification:String(disable_notification),
        protect_content:String(protect_content),
      }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}

//пересылает несколько сообщений по их id из одного чата в другой
//disable_notification false - означает что сообщение придет с уведомлением (звуковым оповещением) true - без уведомления
//protect_content false означает что данное сообщение можно будет еще раз переслать кому то еще. true - данное сообщение будет нельзя пересылать.
function forwardMessages(chat_id, from_chat_id, message_ids, disable_notification=false, protect_content=false)  {
  sendChatAction(chat_id,'typing')
  let data = {
      method: "post",
      payload: {
        method: "forwardMessages",
        chat_id: String(chat_id),
        from_chat_id: String(from_chat_id),
        message_ids: JSON.stringify(message_ids),
        disable_notification: String(disable_notification),
        protect_content: String(protect_content),
      }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + "/", data);
}
