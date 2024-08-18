// ворзвращает инлайн клавиатуру где все значения идут в одну колонку, значения берутся из колонки таблицы с отправленный литералом
function inlineOneColumn(literal) {
  let keys = [];
  let sskeys = ss.getSheetByName("inline_keyboards").getRange(`${literal}2:${literal}`).getValues();
  for (let el in sskeys) {
    if (sskeys[el]=='') {break}
    keys.push([{ "text": `${sskeys[el]}`, "callback_data": `${literal}${el}`}]);
  }
  let keyboard = {
  "inline_keyboard": keys
  };
  return keyboard
}
// ворзвращает инлайн клавиатуру где все значения идут в две колонки, значения берутся из колонки таблицы с отправленный литералом
function inlineTwoColumns(literal) {
  let sskeys = ss.getSheetByName('inline_keyboards').getRange(`${literal}2:${literal}`).getValues().filter(function(row) {
      return row[0] !== "";
    });
    let keys = [];

  for (let i = 0; i < sskeys.length; i += 2) {
      let row = [];
      row.push({ text: `${sskeys[i]}`, callback_data: `${literal}${i}`});
      if (i + 1 < sskeys.length){
        row.push({ text: `${sskeys[i+1]}`, callback_data: `${literal}${i+1}`});
      }
      keys.push(row);
    }
  let keyboard = {
  "inline_keyboard": keys
  };
  return keyboard
}
// ворзвращает инлайн клавиатуру где все значения идут в три колонки, значения берутся из колонки таблицы с отправленный литералом
function inlineThreeColumns(literal) {
  let sskeys = ss.getSheetByName('inline_keyboards').getRange(`${literal}2:${literal}`).getValues().filter(function(row) {
      return row[0] !== "";
    });
    let keys = [];

  for (let i = 0; i < sskeys.length; i += 2) {
      let row = [];
      row.push({ text: `${sskeys[i]}`, callback_data: `${literal}${i}`});
      if (i + 1 < sskeys.length){
        row.push({ text: `${sskeys[i+1]}`, callback_data: `${literal}${i+1}`});
      }
      if (i + 2 < sskeys.length){
        row.push({ text: `${sskeys[i+2]}`, callback_data: `${literal}${i+2}`});
      }
      keys.push(row);
    }
  let keyboard = {
  "inline_keyboard": keys
  };
  return keyboard
}
// ворзвращает клавиатуру где все значения идут в одну колонку, значения берутся из колонки таблицы с отправленный литералом
function keyboardOneColumn(literal, resize_keyboard=true, one_time_keyboard=true,
is_persistent=false) {
  let keys = [];
  let sskeys = ss.getSheetByName("inline_keyboards").getRange(`${literal}2:${literal}`).getValues();
  for (let el in sskeys) {
    if (sskeys[el]=='') {break}
    keys.push([{ "text": `${sskeys[el]}`}]);
  }

  let keyboard = {
  "keyboard": keys,
  "resize_keyboard": resize_keyboard,
  "one_time_keyboard": one_time_keyboard,
  "is_persistent": is_persistent,

  };
  return keyboard
}
// ворзвращает клавиатуру где все значения идут в две колонки, значения берутся из колонки таблицы с отправленный литералом
function keyboardTwoColumns(literal, resize_keyboard=true, one_time_keyboard=true,
is_persistent=false) {
  let sskeys = ss.getSheetByName('inline_keyboards').getRange(`${literal}2:${literal}`).getValues().filter(function(row) {
      return row[0] !== "";
    });
    let keys = [];

  for (let i = 0; i < sskeys.length; i += 2) {
      let row = [];
      row.push({ text: `${sskeys[i]}`, callback_data: `${literal}${i}`});
      if (i + 1 < sskeys.length){
        row.push({ text: `${sskeys[i+1]}`, callback_data: `${literal}${i+1}`});
      }
      keys.push(row);
    }
  let keyboard = {
  "keyboard": keys,
  "resize_keyboard": resize_keyboard,
  "one_time_keyboard": one_time_keyboard,
  "is_persistent": is_persistent,
  
  };
  return keyboard
}
// ворзвращает клавиатуру где все значения идут в три колонки, значения берутся из колонки таблицы с отправленный литералом
function keyboardThreeColumns(literal, resize_keyboard=true, one_time_keyboard=true,
is_persistent=false) {
  let sskeys = ss.getSheetByName('inline_keyboards').getRange(`${literal}2:${literal}`).getValues().filter(function(row) {
      return row[0] !== "";
    });
    let keys = [];

  for (let i = 0; i < sskeys.length; i += 2) {
      let row = [];
      row.push({ text: `${sskeys[i]}`, callback_data: `${literal}${i}`});
      if (i + 1 < sskeys.length){
        row.push({ text: `${sskeys[i+1]}`, callback_data: `${literal}${i+1}`});
      }
      if (i + 2 < sskeys.length){
        row.push({ text: `${sskeys[i+2]}`, callback_data: `${literal}${i+2}`});
      }
      keys.push(row);
    }
  let keyboard = {
  "keyboard": keys,
  "resize_keyboard": resize_keyboard,
  "one_time_keyboard": one_time_keyboard,
  "is_persistent": is_persistent,
  
  };
  return keyboard
}
