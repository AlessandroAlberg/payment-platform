import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import * as moment from 'moment'

const paymentBody = {
  externalId: "4db75773-e427-48fb-a808-2652225ef964",
  amount: 1000.78954,
  expectedOn: moment(new Date()).format('DD-MM-YYYY')
}

const paymentBody2 = {
  externalId: "4db75773-e427-48fb-a808-2652225ef964",
  amount: 1000,
  expectedOn: "25-09-2000"
}

describe('PaymentsController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /paymentsOrders', () => {
    it('should return created payment data', async() => {
      const res = await request(app.getHttpServer())
          .post('/paymentsOrders')
          .send(paymentBody)
          .expect(201)

      expect(res.body).toEqual(
          expect.objectContaining({
            internalId: expect.any(String),
            status: "CREATED"
        })
      )
    })
  })

  describe('POST /paymentsOrders expired due date', () => {
    it('should return error 400', async() => {
      await request(app.getHttpServer())
          .post('/paymentsOrders')
          .send(paymentBody2)
          .expect(400)
    })
  })

  describe('GET /paymentsOrders/:internalId', () => {
    it('should return payment of the internalId', async() => {
      const response = await request(app.getHttpServer())
          .post('/paymentsOrders')
          .send(paymentBody)
          .expect(201)
      
      const { internalId } = response.body

      const res = await request(app.getHttpServer())
          .get(`/paymentsOrders/${internalId}`)
          .expect(200)

      expect(res.body).toEqual(
          expect.objectContaining({
            internalId: internalId,
            externalId: paymentBody.externalId,
            status: "APPROVED",
            amount: parseFloat(paymentBody.amount.toFixed(2)),
            expectedOn: paymentBody.expectedOn
        })
      )
    })
  })

  describe('PATCH /paymentsOrders/internal/:internalId', () => {
    it('should return the updated payment id', async() => {
      const response = await request(app.getHttpServer())
          .post('/paymentsOrders')
          .send(paymentBody)
          .expect(201)
      
      const { internalId } = response.body

      const res = await request(app.getHttpServer())
          .patch(`/paymentsOrders/internal/${internalId}`)
          .send({ status: 'SCHEDULED'})
          .expect(200)

      expect(res.body).toEqual({ id: internalId })
    })
  })
})
