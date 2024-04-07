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
import {Mineral} from '../models';
import {MineralRepository} from '../repositories';

export class MineralController {
  constructor(
    @repository(MineralRepository)
    public mineralRepository : MineralRepository,
  ) {}

  @post('/mineral')
  @response(200, {
    description: 'Mineral model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mineral)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mineral, {
            title: 'NewMineral',
            exclude: ['id'],
          }),
        },
      },
    })
    mineral: Omit<Mineral, 'id'>,
  ): Promise<Mineral> {
    return this.mineralRepository.create(mineral);
  }

  @get('/mineral/count')
  @response(200, {
    description: 'Mineral model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mineral) where?: Where<Mineral>,
  ): Promise<Count> {
    return this.mineralRepository.count(where);
  }

  @get('/mineral')
  @response(200, {
    description: 'Array of Mineral model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mineral, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mineral) filter?: Filter<Mineral>,
  ): Promise<Mineral[]> {
    return this.mineralRepository.find(filter);
  }

  @patch('/mineral')
  @response(200, {
    description: 'Mineral PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mineral, {partial: true}),
        },
      },
    })
    mineral: Mineral,
    @param.where(Mineral) where?: Where<Mineral>,
  ): Promise<Count> {
    return this.mineralRepository.updateAll(mineral, where);
  }

  @get('/mineral/{id}')
  @response(200, {
    description: 'Mineral model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mineral, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mineral, {exclude: 'where'}) filter?: FilterExcludingWhere<Mineral>
  ): Promise<Mineral> {
    return this.mineralRepository.findById(id, filter);
  }

  @patch('/mineral/{id}')
  @response(204, {
    description: 'Mineral PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mineral, {partial: true}),
        },
      },
    })
    mineral: Mineral,
  ): Promise<void> {
    await this.mineralRepository.updateById(id, mineral);
  }

  @put('/mineral/{id}')
  @response(204, {
    description: 'Mineral PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mineral: Mineral,
  ): Promise<void> {
    await this.mineralRepository.replaceById(id, mineral);
  }

  @del('/mineral/{id}')
  @response(204, {
    description: 'Mineral DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mineralRepository.deleteById(id);
  }
}
