const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const concertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Performer One', genre: 'Genre One', price: 10, day: 1, image: 'Image One' });
        await concertOne.save();
        const concertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Performer Two', genre: 'Genre Two', price: 50, day: 2, image: 'Image Two' });
        await concertTwo.save();
      });
    
      it('/:performer should return concert by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Performer_One');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
      });
    
      it('/:genre should return concert by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Genre_One');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
      });
    
      it('/:price_min/:price_max should return concert by price', async () => {
        const res = await request(server).get('/api/concerts/price/5/100');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
      });

      it('/:day should return a concert by day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
      });

    after(async () => {
        await Concert.deleteMany();
      });
});