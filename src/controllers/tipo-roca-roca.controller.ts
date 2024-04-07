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
  TipoRoca,
  Roca,
} from '../models';
import {TipoRocaRepository} from '../repositories';

export class TipoRocaRocaController {
  constructor(
    @repository(TipoRocaRepository) protected tipoRocaRepository: TipoRocaRepository,
  ) { }

  @get('/tipo-rocas/{id}/rocas', {
    responses: {
      '200': {
        description: 'Array of TipoRoca has many Roca',
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
    return this.tipoRocaRepository.rocas(id).find(filter);
  }

  @post('/tipo-rocas/{id}/rocas', {
    responses: {
      '200': {
        description: 'TipoRoca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roca)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoRoca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {
            title: 'NewRocaInTipoRoca',
            exclude: ['id'],
            optional: ['tipoRocaId']
          }),
        },
      },
    }) roca: Omit<Roca, 'id'>,
  ): Promise<Roca> {
    return this.tipoRocaRepository.rocas(id).create(roca);
  }

  @patch('/tipo-rocas/{id}/rocas', {
    responses: {
      '200': {
        description: 'TipoRoca.Roca PATCH success count',
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
    return this.tipoRocaRepository.rocas(id).patch(roca, where);
  }

  @del('/tipo-rocas/{id}/rocas', {
    responses: {
      '200': {
        description: 'TipoRoca.Roca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roca)) where?: Where<Roca>,
  ): Promise<Count> {
    return this.tipoRocaRepository.rocas(id).delete(where);
  }
}
