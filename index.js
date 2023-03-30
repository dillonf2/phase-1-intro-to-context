function createEmployeeRecord(array){
    const employeeObj={
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
    return employeeObj
}
function createEmployeeRecords(array){
    let employeeRecords=[]
   for (const nestedArray of array){
    const createdRecord=createEmployeeRecord(nestedArray)
    employeeRecords.push(createdRecord)
   }
   return employeeRecords
}
function createTimeInEvent(obj,string){
    const hourFinder= Number(string.split(` `)[1])
    const dateFinder=string.split(` `)[0]
    obj.timeInEvents.push(
        {
        type: `TimeIn`,
        hour: hourFinder,
        date: dateFinder
        }
    )
    return obj
}
function createTimeOutEvent(obj,string){
    const hourFinder= Number(string.split(` `)[1])
    const dateFinder=string.split(` `)[0]
    obj.timeOutEvents.push(
        {
            type: `TimeOut`,
            hour: hourFinder,
            date: dateFinder
        }
    )
    return obj
}

function isCorrectDate(timeObj,string){
   return timeObj[`date`]===string
}

function hoursWorkedOnDate(empObj,string){
    let punchIn= empObj.timeInEvents.find((obj)=>isCorrectDate(obj,string))
    let punchOut= empObj.timeOutEvents.find((obj)=> isCorrectDate(obj,string))
    
    return (punchOut.hour-punchIn.hour)/100
    
}
function wagesEarnedOnDate(empObj,string){
    return hoursWorkedOnDate(empObj,string)*empObj.payPerHour
}
function allWagesFor(empObj){

    const datesWages= empObj.timeInEvents.map((date)=>date.date)
    const totalWages=datesWages.reduce((wage,date)=>wagesEarnedOnDate(empObj,date)+wage,0)
    return totalWages
}
function calculatePayroll(empArray){
    const reducer=(accumulator, obj)=>{
        let total=allWagesFor(obj)
        return accumulator+total
    }
    let total=empArray.reduce(reducer,0)
    return total
}
