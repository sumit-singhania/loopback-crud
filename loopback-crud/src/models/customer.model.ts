import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserList, UserListRelations, UserListWithRelations} from './user-list.model';

@model({settings: {strict: true}})
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasOne(() => UserList)
  userList: UserList;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
  Customer : UserListWithRelations;
}

export type CustomerWithRelations = Customer & CustomerRelations;
