import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {UserList, UserListRelations} from '../models';

export class UserListRepository extends DefaultCrudRepository<
  UserList,
  typeof UserList.prototype.userId,
  UserListRelations
> {
  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource,
  ) {
    super(UserList, dataSource);
  }
}
