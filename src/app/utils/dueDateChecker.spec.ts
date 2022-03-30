import * as moment from 'moment';
import { dueDateChecker } from './dueDateChecker'

describe('DueDateTest', () => {
    describe('when the due date is in the future', () => {
        it('should return true', () => {
            const date = moment().add(10, 'days').calendar()
            expect(dueDateChecker(date)).toEqual(false)
        })
    })

    describe('when the due date is today', () => {
        it('should return true', () => {
            const date = moment().format()
            expect(dueDateChecker(date)).toEqual(false)
        })
    })

    describe('when the date is not valid', () => {
        it('should return false', () => {
            const date = moment("11-12-1999", "DD-MM-YYYY").toDate()
            expect(dueDateChecker(date)).toEqual(true)
        })
    })
})