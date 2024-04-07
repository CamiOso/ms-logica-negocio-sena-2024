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
Mineral,
RocaMineral,
Roca,
} from '../models';
import {MineralRepository} from '../repositories';

export class MineralRocaController {
  constructor(
    @repository(MineralRepository) protected mineralRepository: MineralRepository,
  ) { }

  @get('/minerals/{id}/rocas', {
    responses: {
      '200': {
        description: 'Array of Mineral has many Roca through RocaMineral',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roca)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Roca>,
  ): Promise<Roca[]> {
    return this.mineralRepository.rocas(id).find(filter);
  }

  @post('/minerals/{id}/rocas', {
    responses: {
      '200': {
        description: 'create a Roca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roca)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Mineral.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {
            title: 'NewRocaInMineral',
            exclude: ['id'],
          }),
        },
      },
    }) roca: Omit<Roca, 'id'>,
  ): Promise<Roca> {
    return this.mineralRepository.rocas(id).create(roca);
  }

  @patch('/minerals/{id}/rocas', {
    responses: {
      '200': {
        description: 'Mineral.Roca PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {partial: true}),
        },
      },
    })
    roca: Partial<Roca>,
    @param.query.object('where', getWhereSchemaFor(Roca)) where?: Where<Roca>,
  ): Promise<Count> {
    return this.mineralRepository.rocas(id).patch(roca, where);
  }

  @del('/minerals/{id}/rocas', {
    responses: {
      '200': {
        description: 'Mineral.Roca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roca)) where?: Where<Roca>,
  ): Promise<Count> {
    return this.mineralRepository.rocas(id).delete(where);
  }
}
