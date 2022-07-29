import {Client, expect} from '@loopback/testlab';
import {LoopbackCrudApplication} from '../..';
import {setupApplication} from './test-helper';

describe('CustomerController', () => {
  let app: LoopbackCrudApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  /**
   * Test save customer api
   */
  it('invokes POST /customers', async () => {
    const res = await client.post('/customers').send({
      "name": "string",
      "website": "string",
      "address": "string"
    }
    ).expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    expect(res.body).to.be.Object();
  });

  /**
   * Test get customer api
   */
  it('invokes GET /customers', async () => {
    const res = await client.get('/customers'
    ).expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    expect(res.body).to.be.Array();
  });

});
