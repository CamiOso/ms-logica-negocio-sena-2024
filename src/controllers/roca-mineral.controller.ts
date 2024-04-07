import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Roca,
RocaMineral,
Mineral,
} from '../models';
import {RocaRepository} from '../repositories';

export class RocaMineralController {
  constructor(
    @repository(RocaRepository) protected rocaRepository: RocaRepository,
  ) { }

  @get('/rocas/{id}/minerals', {
    responses: {
      '200': {
        description: 'Array of Roca has many Mineral through RocaMineral',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mineral)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Mineral>,
  ): Promise<Mineral[]> {
    return this.rocaRepository.minerales(id).find(filter);
  }

  @post('/rocas/{id}/minerals', {
    responses: {
      '200': {
        description: 'create a Mineral model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mineral)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mineral, {
            title: 'NewMineralInRoca',
            exclude: ['id'],
          }),
        },
      },
    }) mineral: Omit<Mineral, 'id'>,
  ): Promise<Mineral> {
    return this.rocaRepository.minerales(id).create(mineral);
  }

  @patch('/rocas/{id}/minerals', {
    responses: {
      '200': {
        description: 'Roca.Mineral PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mineral, {partial: true}),
        },
      },
    })
    mineral: Partial<Mineral>,
    @param.query.object('where', getWhereSchemaFor(Mineral)) where?: Where<Mineral>,
  ): Promise<Count> {
    return this.rocaRepository.minerales(id).patch(mineral, where);
  }

  @del('/rocas/{id}/minerals', {
    responses: {
      '200': {
        description: 'Roca.Mineral DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mineral)) where?: Where<Mineral>,
  ): Promise<Count> {
    return this.rocaRepository.minerales(id).delete(where);
  }
}
