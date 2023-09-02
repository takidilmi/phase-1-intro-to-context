// createEmployeeRecord function
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

const createEmployeeRecords = (employeeData) => {
  return employeeData.map((data) => createEmployeeRecord(data));
};

const createTimeInEvent = (employee, dateStamp) => {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
};

const createTimeOutEvent = (employee, dateStamp) => {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
};

const hoursWorkedOnDate = (employee, date) => {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);

  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100;
  }

  return 0;
};

const wagesEarnedOnDate = (employee, date) => {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
};

const allWagesFor = (employee) => {
  const dates = employee.timeInEvents.map((event) => event.date);
  const totalWages = dates.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return totalWages;
};

const calculatePayroll = (employees) => {
  return employees.reduce(
    (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
    0
  );
};