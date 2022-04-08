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
import {Phone} from '../models';
import {PhoneRepository} from '../repositories';

export class PhoneController {
  constructor(
    @repository(PhoneRepository)
    public phoneRepository : PhoneRepository,
  ) {}

  @post('/phones')
  @response(200, {
    description: 'Phone model instance',
    content: {'application/json': {schema: getModelSchemaRef(Phone)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phone, {
            title: 'NewPhone',
            
          }),
        },
      },
    })
    phone: Phone,
  ): Promise<Phone> {
    return this.phoneRepository.create(phone);
  }

  @get('/phones/count')
  @response(200, {
    description: 'Phone model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Phone) where?: Where<Phone>,
  ): Promise<Count> {
    return this.phoneRepository.count(where);
  }

  @get('/phones')
  @response(200, {
    description: 'Array of Phone model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Phone, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Phone) filter?: Filter<Phone>,
  ): Promise<Phone[]> {
    return this.phoneRepository.find(filter);
  }

  @patch('/phones')
  @response(200, {
    description: 'Phone PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phone, {partial: true}),
        },
      },
    })
    phone: Phone,
    @param.where(Phone) where?: Where<Phone>,
  ): Promise<Count> {
    return this.phoneRepository.updateAll(phone, where);
  }

  @get('/phones/{id}')
  @response(200, {
    description: 'Phone model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Phone, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Phone, {exclude: 'where'}) filter?: FilterExcludingWhere<Phone>
  ): Promise<Phone> {
    return this.phoneRepository.findById(id, filter);
  }

  @patch('/phones/{id}')
  @response(204, {
    description: 'Phone PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phone, {partial: true}),
        },
      },
    })
    phone: Phone,
  ): Promise<void> {
    await this.phoneRepository.updateById(id, phone);
  }

  @put('/phones/{id}')
  @response(204, {
    description: 'Phone PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() phone: Phone,
  ): Promise<void> {
    await this.phoneRepository.replaceById(id, phone);
  }

  @del('/phones/{id}')
  @response(204, {
    description: 'Phone DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.phoneRepository.deleteById(id);
  }
}
