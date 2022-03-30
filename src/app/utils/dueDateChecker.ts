import * as moment from "moment"

export function dueDateChecker(dueDate) {
    const expectedOn = moment(dueDate, "DD-MM-YYYY").toDate()
    const today = new Date()
    const formattedDate = moment(`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`, "DD-MM-YYYY").toDate()

    return dueDate ? !moment(expectedOn).isSameOrAfter(formattedDate) : false
}