import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {InMemoryDbDataSource, PostgresDbDataSource} from '../datasources';
import {Customer, CustomerRelations, UserList} from '../models';
import {UserListRepository} from './user-list.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly userList: HasOneRepositoryFactory<UserList, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource, @repository.getter('UserListRepository') protected userListRepositoryGetter: Getter<UserListRepository>,
  ) {
    super(Customer, dataSource);
    this.userList = this.createHasOneRepositoryFactoryFor('userList', userListRepositoryGetter);
    this.registerInclusionResolver('userList', this.userList.inclusionResolver);
  }
}
