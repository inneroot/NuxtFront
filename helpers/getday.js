let montharr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентяюря', 'октября', 'ноября', 'декабря']

function getday() {
  let ourdate = new Date()
  let dd = ourdate.getDate()
  let mm = ourdate.getMonth() + 1 //January is 0!
  let yyyy = ourdate.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return `${yyyy}-${mm}-${dd}`
}

function convertdate(datestring) {
  return {
    year: datestring.slice(0, 4),
    month: datestring.slice(5, 7),
    day: datestring.slice(8, 10)
  }
}

function stringdate(datestring) {
  return `${datestring.slice(8, 10)} ${montharr[parseInt(datestring.slice(5, 7), 10) - 1]}`
}

function getWeekDay(datestring) {
  let date = new Date(datestring);
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let day = date.getDay();

  return days[day];
}

export {
  montharr,
  getday,
  convertdate,
  stringdate,
  getWeekDay
};
