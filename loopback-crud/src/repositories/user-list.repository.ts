import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {UserList, UserListRelations, Customer} from '../models';
import {CustomerRepository} from './customer.repository';

export class UserListRepository extends DefaultCrudRepository<
  UserList,
  typeof UserList.prototype.userId,
  UserListRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof UserList.prototype.userId>;

  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(UserList, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
