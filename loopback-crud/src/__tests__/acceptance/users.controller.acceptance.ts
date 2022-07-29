import {Client, expect} from '@loopback/testlab';
import {LoopbackCrudApplication} from '../..';
import {setupApplication} from './test-helper';

describe('UserController', () => {
  let app: LoopbackCrudApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  

  /**
   * case to save user
   */
  it('invokes Post /user-lists', async () => {
    const res = await client.post('/user-lists').send({
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "email": "string",
      "phoneNumber": 0,
      "role": "string",
      "address": "string",
      "createdOn": "2022-07-29T07:00:17.248Z",
      "modifiedOn": "2022-07-29T07:00:17.248Z",
      "isEdit": false,
      "customerId": 1
    }).expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    expect(res.body).to.be.Object();
  });

  /**
   * Test case to get a list of users
   */
  it('invokes GET /user-lists', async () => {
    const res = await client.get('/user-lists').expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    expect(res.body).to.be.Array();
  });

   /**
   * Error case to save user
   */
    it('invokes Post with wrong param /user-lists', async () => {
       await client.post('/user-lists').send({
        "email": "string",
        "phoneNumber": 0,
        "role": "string",
        "address": "string",
        "createdOn": "2022-07-29T07:00:17.248Z",
        "modifiedOn": "2022-07-29T07:00:17.248Z",
        "isEdit": false,
        "customerId": 1
      }).expect(422);
      // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    });


  /**
   *   save user with wong param type
   */
  it('invokes Post missing param /user-lists', async () => {
    const res = await client.post('/user-lists').send({
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "email": "string",
      "phoneNumber": 0,
      "role": "string",
      "address": "string",
      "createdOn": "2022-07-29T07:00:17.248Z",
      "modifiedOn": "2022-07-29T07:00:17.248Z",
      "customerId": 1
    }).expect(422);
    expect(JSON.parse(res.text)).to.eql({"error":{"statusCode":422,"name":"UnprocessableEntityError","message":"The request body is invalid. See error object `details` property for more info.","code":"VALIDATION_FAILED","details":[{"path":"","code":"required","message":"must have required property 'isEdit'","info":{"missingProperty":"isEdit"}}]}});
  
  });

   /**
   * Delte user case
   */
    it('invokes DELETE /user-lists/{id}', async () => {
      await client.get('/user-lists/1').expect(200);
      
    });
});
