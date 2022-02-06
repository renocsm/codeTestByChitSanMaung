const convertUTCDateToLocalDate=(date)=> {
    var newDate = new Date(date).toLocaleDateString();
    return newDate;   
}

export default convertUTCDateToLocalDate;