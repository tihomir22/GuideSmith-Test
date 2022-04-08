import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Phone, PhoneRelations} from '../models';

export class PhoneRepository extends DefaultCrudRepository<
  Phone,
  typeof Phone.prototype.id,
  PhoneRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Phone, dataSource);
  }
}
