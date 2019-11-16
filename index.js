// Your code here
const createEmployeeRecord = (recordArray) => {
    let employeeRecord = {
    firstName: recordArray[0],
    familyName: recordArray[1],
    title: recordArray[2],
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: []
    } 
    return employeeRecord
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(record => {
        return createEmployeeRecord(record)
    })
}

const createTimeInEvent = (employeeRecord, dateTimeString) => {
    let [date, time] = dateTimeString.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateTimeString) => {
    let [date, time] = dateTimeString.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord) => {
    // return parseInt(employeeRecord.timeOutEvents.hour) - parseInt(employeeRecord.timeInEvents.hour)
    return (employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour) / 100
}

const wagesEarnedOnDate = (employeeRecord) => {
    return hoursWorkedOnDate(employeeRecord) * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {
    let dates = employeeRecord.timeInEvents.map(event => {
        return event.date
    })

    let wages = dates.reduce((wage, date) => {
        return wage + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return wages
}

const findEmployeeByFirstName = (employeesArray, name) => {
  return employeesArray.find(employeeRecord => {
    return employeeRecord.firstName === name
  })
}

const calculatePayroll = employeeRecordsArray =>{
    return employeeRecordsArray.reduce((wage, employeeRecord) => {
        return wage + allWagesFor(employeeRecord)
    }, 0)
}