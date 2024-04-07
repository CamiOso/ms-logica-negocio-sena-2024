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
import {Litologia} from '../models';
import {LitologiaRepository} from '../repositories';

export class LitologiaController {
  constructor(
    @repository(LitologiaRepository)
    public litologiaRepository : LitologiaRepository,
  ) {}

  @post('/litologia')
  @response(200, {
    description: 'Litologia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Litologia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Litologia, {
            title: 'NewLitologia',
            exclude: ['id'],
          }),
        },
      },
    })
    litologia: Omit<Litologia, 'id'>,
  ): Promise<Litologia> {
    return this.litologiaRepository.create(litologia);
  }

  @get('/litologia/count')
  @response(200, {
    description: 'Litologia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Litologia) where?: Where<Litologia>,
  ): Promise<Count> {
    return this.litologiaRepository.count(where);
  }

  @get('/litologia')
  @response(200, {
    description: 'Array of Litologia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Litologia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Litologia) filter?: Filter<Litologia>,
  ): Promise<Litologia[]> {
    return this.litologiaRepository.find(filter);
  }

  @patch('/litologia')
  @response(200, {
    description: 'Litologia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Litologia, {partial: true}),
        },
      },
    })
    litologia: Litologia,
    @param.where(Litologia) where?: Where<Litologia>,
  ): Promise<Count> {
    return this.litologiaRepository.updateAll(litologia, where);
  }

  @get('/litologia/{id}')
  @response(200, {
    description: 'Litologia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Litologia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Litologia, {exclude: 'where'}) filter?: FilterExcludingWhere<Litologia>
  ): Promise<Litologia> {
    return this.litologiaRepository.findById(id, filter);
  }

  @patch('/litologia/{id}')
  @response(204, {
    description: 'Litologia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Litologia, {partial: true}),
        },
      },
    })
    litologia: Litologia,
  ): Promise<void> {
    await this.litologiaRepository.updateById(id, litologia);
  }

  @put('/litologia/{id}')
  @response(204, {
    description: 'Litologia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() litologia: Litologia,
  ): Promise<void> {
    await this.litologiaRepository.replaceById(id, litologia);
  }

  @del('/litologia/{id}')
  @response(204, {
    description: 'Litologia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.litologiaRepository.deleteById(id);
  }
}
