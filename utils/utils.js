

// format to: (Month Name) (Month day) 
function formatDate(date){
  const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
  const splitDate = date.split("/")
  let monthString = months[splitDate[1]-1]
  let monthDay = splitDate[2].startsWith("0") ? splitDate[2].slice(1) : splitDate[2]
  return monthString + " " + monthDay
}



export {formatDate}