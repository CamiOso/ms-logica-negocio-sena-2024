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
import {Planeador} from '../models';
import {PlaneadorRepository} from '../repositories';

export class PlaneadorController {
  constructor(
    @repository(PlaneadorRepository)
    public planeadorRepository : PlaneadorRepository,
  ) {}

  @post('/planeador')
  @response(200, {
    description: 'Planeador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Planeador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planeador, {
            title: 'NewPlaneador',
            exclude: ['id'],
          }),
        },
      },
    })
    planeador: Omit<Planeador, 'id'>,
  ): Promise<Planeador> {
    return this.planeadorRepository.create(planeador);
  }

  @get('/planeador/count')
  @response(200, {
    description: 'Planeador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Planeador) where?: Where<Planeador>,
  ): Promise<Count> {
    return this.planeadorRepository.count(where);
  }

  @get('/planeador')
  @response(200, {
    description: 'Array of Planeador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Planeador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Planeador) filter?: Filter<Planeador>,
  ): Promise<Planeador[]> {
    return this.planeadorRepository.find(filter);
  }

  @patch('/planeador')
  @response(200, {
    description: 'Planeador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planeador, {partial: true}),
        },
      },
    })
    planeador: Planeador,
    @param.where(Planeador) where?: Where<Planeador>,
  ): Promise<Count> {
    return this.planeadorRepository.updateAll(planeador, where);
  }

  @get('/planeador/{id}')
  @response(200, {
    description: 'Planeador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Planeador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Planeador, {exclude: 'where'}) filter?: FilterExcludingWhere<Planeador>
  ): Promise<Planeador> {
    return this.planeadorRepository.findById(id, filter);
  }

  @patch('/planeador/{id}')
  @response(204, {
    description: 'Planeador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planeador, {partial: true}),
        },
      },
    })
    planeador: Planeador,
  ): Promise<void> {
    await this.planeadorRepository.updateById(id, planeador);
  }

  @put('/planeador/{id}')
  @response(204, {
    description: 'Planeador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() planeador: Planeador,
  ): Promise<void> {
    await this.planeadorRepository.replaceById(id, planeador);
  }

  @del('/planeador/{id}')
  @response(204, {
    description: 'Planeador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planeadorRepository.deleteById(id);
  }
}
