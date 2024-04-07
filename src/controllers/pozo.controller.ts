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
import {Pozo} from '../models';
import {PozoRepository} from '../repositories';

export class PozoController {
  constructor(
    @repository(PozoRepository)
    public pozoRepository : PozoRepository,
  ) {}

  @post('/pozo')
  @response(200, {
    description: 'Pozo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pozo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pozo, {
            title: 'NewPozo',
            exclude: ['id'],
          }),
        },
      },
    })
    pozo: Omit<Pozo, 'id'>,
  ): Promise<Pozo> {
    return this.pozoRepository.create(pozo);
  }

  @get('/pozo/count')
  @response(200, {
    description: 'Pozo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pozo) where?: Where<Pozo>,
  ): Promise<Count> {
    return this.pozoRepository.count(where);
  }

  @get('/pozo')
  @response(200, {
    description: 'Array of Pozo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pozo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pozo) filter?: Filter<Pozo>,
  ): Promise<Pozo[]> {
    return this.pozoRepository.find(filter);
  }

  @patch('/pozo')
  @response(200, {
    description: 'Pozo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pozo, {partial: true}),
        },
      },
    })
    pozo: Pozo,
    @param.where(Pozo) where?: Where<Pozo>,
  ): Promise<Count> {
    return this.pozoRepository.updateAll(pozo, where);
  }

  @get('/pozo/{id}')
  @response(200, {
    description: 'Pozo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pozo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pozo, {exclude: 'where'}) filter?: FilterExcludingWhere<Pozo>
  ): Promise<Pozo> {
    return this.pozoRepository.findById(id, filter);
  }

  @patch('/pozo/{id}')
  @response(204, {
    description: 'Pozo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pozo, {partial: true}),
        },
      },
    })
    pozo: Pozo,
  ): Promise<void> {
    await this.pozoRepository.updateById(id, pozo);
  }

  @put('/pozo/{id}')
  @response(204, {
    description: 'Pozo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pozo: Pozo,
  ): Promise<void> {
    await this.pozoRepository.replaceById(id, pozo);
  }

  @del('/pozo/{id}')
  @response(204, {
    description: 'Pozo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pozoRepository.deleteById(id);
  }
}
