import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customer,
  UserList,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerUserListController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/user-list', {
    responses: {
      '200': {
        description: 'Customer has one UserList',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserList),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserList>,
  ): Promise<UserList> {
    return this.customerRepository.userList(id).get(filter);
  }

  @post('/customers/{id}/user-list', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserList)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserList, {
            title: 'NewUserListInCustomer',
            exclude: ['userId'],
            optional: ['customerId']
          }),
        },
      },
    }) userList: Omit<UserList, 'userId'>,
  ): Promise<UserList> {
    return this.customerRepository.userList(id).create(userList);
  }

  @patch('/customers/{id}/user-list', {
    responses: {
      '200': {
        description: 'Customer.UserList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserList, {partial: true}),
        },
      },
    })
    userList: Partial<UserList>,
    @param.query.object('where', getWhereSchemaFor(UserList)) where?: Where<UserList>,
  ): Promise<Count> {
    return this.customerRepository.userList(id).patch(userList, where);
  }

  @del('/customers/{id}/user-list', {
    responses: {
      '200': {
        description: 'Customer.UserList DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserList)) where?: Where<UserList>,
  ): Promise<Count> {
    return this.customerRepository.userList(id).delete(where);
  }
}
