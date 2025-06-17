import request from 'supertest'
import app from '../../../app.js'


describe("user", () =>{
    it('Should create an user', async() =>{
        const res = await request(app).post('/addingUser').send({name: 'vini'})

        // expect(res.statusCode).toBe(201)
        // expect(res.body.name).toBe('vini');
    })
})
// npm install --save-dev @babel/preset-env @babel/core babel-jest
//  Create a babel.config.js file:
// export default {
//   presets: ['@babel/preset-env'],
// };