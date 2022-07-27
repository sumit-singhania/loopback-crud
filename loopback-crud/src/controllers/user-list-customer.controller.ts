import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserList,
  Customer,
} from '../models';
import {UserListRepository} from '../repositories';

export class UserListCustomerController {
  constructor(
    @repository(UserListRepository)
    public userListRepository: UserListRepository,
  ) { }

  @get('/user-lists/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to UserList',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof UserList.prototype.userId,
  ): Promise<Customer> {
    return this.userListRepository.customer(id);
  }
}
