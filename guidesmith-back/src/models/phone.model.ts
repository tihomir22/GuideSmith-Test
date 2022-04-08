import {Entity, model, property} from '@loopback/repository';

@model()
export class Phone extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  manufacturer: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  screen: string;

  @property({
    type: 'string',
    required: true,
  })
  processor: string;

  @property({
    type: 'string',
    required: true,
  })
  ram: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  detailImages?: string[];

  constructor(data?: Partial<Phone>) {
    super(data);
  }
}

export interface PhoneRelations {
  // describe navigational properties here
}

export type PhoneWithRelations = Phone & PhoneRelations;
