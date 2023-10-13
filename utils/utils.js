


// convert yyyy-mm-dd string to a date object while accounting for timezone
function correctDateStrOffset(dateStr){
  let hourOffset = new Date(dateStr).getTimezoneOffset() / 60;    
  let hour = hourOffset >= 0 ? Math.ceil(hourOffset) : 24 - Math.ceil(hourOffset);
  let dateTimeString = `${dateStr}T${hour}:00:00`;
  let dateObj = new Date(dateTimeString);
  return dateObj
}

export { correctDateStrOffset }