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
import {Roca} from '../models';
import {RocaRepository} from '../repositories';

export class RocaController {
  constructor(
    @repository(RocaRepository)
    public rocaRepository : RocaRepository,
  ) {}

  @post('/roca')
  @response(200, {
    description: 'Roca model instance',
    content: {'application/json': {schema: getModelSchemaRef(Roca)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {
            title: 'NewRoca',
            exclude: ['id'],
          }),
        },
      },
    })
    roca: Omit<Roca, 'id'>,
  ): Promise<Roca> {
    return this.rocaRepository.create(roca);
  }

  @get('/roca/count')
  @response(200, {
    description: 'Roca model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Roca) where?: Where<Roca>,
  ): Promise<Count> {
    return this.rocaRepository.count(where);
  }

  @get('/roca')
  @response(200, {
    description: 'Array of Roca model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Roca, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Roca) filter?: Filter<Roca>,
  ): Promise<Roca[]> {
    return this.rocaRepository.find(filter);
  }

  @patch('/roca')
  @response(200, {
    description: 'Roca PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {partial: true}),
        },
      },
    })
    roca: Roca,
    @param.where(Roca) where?: Where<Roca>,
  ): Promise<Count> {
    return this.rocaRepository.updateAll(roca, where);
  }

  @get('/roca/{id}')
  @response(200, {
    description: 'Roca model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Roca, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Roca, {exclude: 'where'}) filter?: FilterExcludingWhere<Roca>
  ): Promise<Roca> {
    return this.rocaRepository.findById(id, filter);
  }

  @patch('/roca/{id}')
  @response(204, {
    description: 'Roca PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {partial: true}),
        },
      },
    })
    roca: Roca,
  ): Promise<void> {
    await this.rocaRepository.updateById(id, roca);
  }

  @put('/roca/{id}')
  @response(204, {
    description: 'Roca PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() roca: Roca,
  ): Promise<void> {
    await this.rocaRepository.replaceById(id, roca);
  }

  @del('/roca/{id}')
  @response(204, {
    description: 'Roca DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rocaRepository.deleteById(id);
  }
}
