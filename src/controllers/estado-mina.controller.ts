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
Estado,
EstadoMina,
Mina,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoMinaController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/minas', {
    responses: {
      '200': {
        description: 'Array of Estado has many Mina through EstadoMina',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mina)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Mina>,
  ): Promise<Mina[]> {
    return this.estadoRepository.minas(id).find(filter);
  }

  @post('/estados/{id}/minas', {
    responses: {
      '200': {
        description: 'create a Mina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mina)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mina, {
            title: 'NewMinaInEstado',
            exclude: ['id'],
          }),
        },
      },
    }) mina: Omit<Mina, 'id'>,
  ): Promise<Mina> {
    return this.estadoRepository.minas(id).create(mina);
  }

  @patch('/estados/{id}/minas', {
    responses: {
      '200': {
        description: 'Estado.Mina PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mina, {partial: true}),
        },
      },
    })
    mina: Partial<Mina>,
    @param.query.object('where', getWhereSchemaFor(Mina)) where?: Where<Mina>,
  ): Promise<Count> {
    return this.estadoRepository.minas(id).patch(mina, where);
  }

  @del('/estados/{id}/minas', {
    responses: {
      '200': {
        description: 'Estado.Mina DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mina)) where?: Where<Mina>,
  ): Promise<Count> {
    return this.estadoRepository.minas(id).delete(where);
  }
}
