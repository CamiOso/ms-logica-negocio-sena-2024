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
import {Perforacion} from '../models';
import {PerforacionRepository} from '../repositories';

export class PerforacionController {
  constructor(
    @repository(PerforacionRepository)
    public perforacionRepository : PerforacionRepository,
  ) {}

  @post('/perforacion')
  @response(200, {
    description: 'Perforacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Perforacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforacion, {
            title: 'NewPerforacion',
            exclude: ['id'],
          }),
        },
      },
    })
    perforacion: Omit<Perforacion, 'id'>,
  ): Promise<Perforacion> {
    return this.perforacionRepository.create(perforacion);
  }

  @get('/perforacion/count')
  @response(200, {
    description: 'Perforacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perforacion) where?: Where<Perforacion>,
  ): Promise<Count> {
    return this.perforacionRepository.count(where);
  }

  @get('/perforacion')
  @response(200, {
    description: 'Array of Perforacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perforacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perforacion) filter?: Filter<Perforacion>,
  ): Promise<Perforacion[]> {
    return this.perforacionRepository.find(filter);
  }

  @patch('/perforacion')
  @response(200, {
    description: 'Perforacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforacion, {partial: true}),
        },
      },
    })
    perforacion: Perforacion,
    @param.where(Perforacion) where?: Where<Perforacion>,
  ): Promise<Count> {
    return this.perforacionRepository.updateAll(perforacion, where);
  }

  @get('/perforacion/{id}')
  @response(200, {
    description: 'Perforacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perforacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Perforacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Perforacion>
  ): Promise<Perforacion> {
    return this.perforacionRepository.findById(id, filter);
  }

  @patch('/perforacion/{id}')
  @response(204, {
    description: 'Perforacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforacion, {partial: true}),
        },
      },
    })
    perforacion: Perforacion,
  ): Promise<void> {
    await this.perforacionRepository.updateById(id, perforacion);
  }

  @put('/perforacion/{id}')
  @response(204, {
    description: 'Perforacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() perforacion: Perforacion,
  ): Promise<void> {
    await this.perforacionRepository.replaceById(id, perforacion);
  }

  @del('/perforacion/{id}')
  @response(204, {
    description: 'Perforacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.perforacionRepository.deleteById(id);
  }
}
