export const formatDate = (mydate, withHour) => {
    let date = new Date(mydate);
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yy = date.getFullYear()
    let hour = date.getHours()
    let min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    mm = (mm < 10 ? '0' : '') + mm;
    let newDate = dd + "/" + mm + "/" + yy
    if (withHour)
        newDate += " à " + hour + "h" + min
    return newDate
}