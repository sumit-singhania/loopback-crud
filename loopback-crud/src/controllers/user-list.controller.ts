import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { error } from 'console';
import {UserList} from '../models';
import {CustomerRepository, UserListRepository} from '../repositories';

export class UserListController {
  constructor(
    @repository(UserListRepository)
    public userListRepository : UserListRepository,
    @repository(CustomerRepository)
    public customerListRepository : CustomerRepository
  ) {}

  @post('/user-lists')
  @response(200, {
    description: 'UserList model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserList, {
            title: 'NewUserList',
            exclude: ['id'],
          }),
        },
      },
    })
    userList: Omit<UserList, 'id'>,
  ): Promise<UserList> {
    const id = userList.customerId;
    const customerExist = this.customerListRepository.findById(id);
    const userWithCustomerIdExist = this.userListRepository.find({ where:{customerId: id}})
    if (!customerExist && await userWithCustomerIdExist){
     throw error;
     
    }
    return this.userListRepository.create(userList);
  }

  @get('/user-lists/count')
  @response(200, {
    description: 'UserList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserList) where?: Where<UserList>,
  ): Promise<Count> {
    return this.userListRepository.count(where);
  }

  @get('/user-lists')
  @response(200, {
    description: 'Array of UserList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserList) filter?: Filter<UserList>,
  ): Promise<UserList[]> {
    return this.userListRepository.find(filter);
  }

  @patch('/user-lists')
  @response(200, {
    description: 'UserList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserList, {partial: true}),
        },
      },
    })
    userList: UserList,
    @param.where(UserList) where?: Where<UserList>,
  ): Promise<Count> {
    return this.userListRepository.updateAll(userList, where);
  }

  @get('/user-lists/{id}')
  @response(200, {
    description: 'UserList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserList, {exclude: 'where'}) filter?: FilterExcludingWhere<UserList>
  ): Promise<UserList> {
    return this.userListRepository.findById(id, filter);
  }

  @patch('/user-lists/{id}')
  @response(204, {
    description: 'UserList PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserList, {partial: true}),
        },
      },
    })
    userList: UserList,
  ): Promise<void> {
    await this.userListRepository.updateById(id, userList);
  }

  @put('/user-lists/{id}')
  @response(204, {
    description: 'UserList PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userList: UserList,
  ): Promise<void> {
    await this.userListRepository.replaceById(id, userList);
  }

  @del('/user-lists/{id}')
  @response(204, {
    description: 'UserList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userListRepository.deleteById(id);
  }
}
