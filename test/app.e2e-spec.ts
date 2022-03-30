import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

const paymentBody = {
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
            internalId: expect.any(String),
            externalId: paymentBody.externalId,
            status: "APPROVED",
            amount: paymentBody.amount,
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
