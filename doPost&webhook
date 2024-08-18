//устанавливает соединение в тг ботом
function setWebhook() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/setWebhook?url=" + webAppUrl);
  console.log(response.getContentText());
}

//сохраняет пришедшие данные в таблицу и передает управление функции main()
function doPost(e) {
  let contents = JSON.parse(e.postData.contents);
  //записывает данные пришедшего события в таблицу debug
  debug.getRange(1, 1).setValue(JSON.stringify(contents, null, 5));
  debugLastRow = debug.getLastRow();

  let date = new Date;
  let chat_id, first_name, last_name, username, message_id, text, iscommand;
  
  try {
    if (contents.callback_query) {
      chat_id = contents.callback_query.from.id;
      if (contents.callback_query.from.first_name) {
        first_name = contents.callback_query.from.first_name;
      } else (first_name = '')
      if (contents.callback_query.from.last_name) {
        last_name = contents.callback_query.from.last_name;
      } else (last_name = '')
      username = contents.callback_query.from.username;
      message_id = contents.callback_query.message.message_id;
      text = contents.callback_query.data;
      iscommand = 'inline'
    } else {
    chat_id = contents.message.chat.id;
    if (contents.message.chat.first_name) {
      first_name = contents.message.chat.first_name;
    } else (first_name = '')
    if (contents.message.chat.last_name) {
      last_name = contents.message.chat.last_name;
    } else (last_name = '')
    username = contents.message.chat.username;
    message_id = contents.message.message_id;
    text = contents.message.text;
    if (contents.message.entities) {
      iscommand = contents.message.entities.type
    } else {iscommand = 'not'};
    }
  } catch (err) {
    debug.getRange(debugLastRow+1, 1).setValue(String(err));
  }
  let update = [date, chat_id, first_name,last_name,username, message_id, text, iscommand];
  //записывает данные сообщения в таблицу messages
  messagesSheetUpdate(update)
  main(date, chat_id, first_name,last_name,username, message_id, text, iscommand)
}
