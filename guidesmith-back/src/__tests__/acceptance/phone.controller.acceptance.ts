import {Client, expect} from '@loopback/testlab';
import {GuidesmithBackApplication} from '../..';
import {Phone} from '../../models';
import {setupApplication} from './test-helper';
describe('PhoneController', () => {
  let app: GuidesmithBackApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('It has phones', async () => {
    const res = await client.get('/phones/count').expect(200);
    expect(res.body.count).to.be.above(0);
  });

  it('It has valid structure', async () => {
    const res = await client.get('/phones').expect(200);
    let phones: Array<Phone> = res.body;
    expect(phones.length).to.be.above(0);
    expect(!!phones[0].color).to.be.true();
    expect(!!phones[0].description).to.be.true();
    expect(!!phones[0].imageUrl).to.be.true();
    expect(!!phones[0].manufacturer).to.be.true();
    expect(!!phones[0].name).to.be.true();
    expect(!!phones[0].price).to.be.true();
    expect(!!phones[0].processor).to.be.true();
    expect(!!phones[0].ram).to.be.true();
    expect(!!phones[0].screen).to.be.true();
  });
});
