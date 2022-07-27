import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';

@model({settings: {strict: false}})
export class UserList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userId?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
  })
  phoneNumber?: number;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: string;

  @property({
    type: 'date',
  })
  modifiedOn?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isEdit: boolean;

  @belongsTo(() => Customer)
  customerId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserList>) {
    super(data);
  }
}

export interface UserListRelations {
  // describe navigational properties here
}

export type UserListWithRelations = UserList & UserListRelations;
