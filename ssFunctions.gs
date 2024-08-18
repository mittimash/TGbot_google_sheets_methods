//принимает массив данных и заносит их на последнюю строку таблицы messages
function messagesSheetUpdate(update) {
  let lastRow = messages.getLastRow()
  console.log(lastRow)
  if (lastRow === 0) {
    messages.getRange(1,1,1,6).setValues(
      [
      [
        'date', 
        'chat_id',
        'first_name',
        'last_name',
        'username', 
        'message_id', 
        'text',
        'iscommand'
      ]
      ]
    );
    lastRow+=1
  }
  messages.getRange(lastRow+1,1,1,update.length).setValues(
      [
        update
      ]
    );

}
