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
Mina,
EstadoMina,
Estado,
} from '../models';
import {MinaRepository} from '../repositories';

export class MinaEstadoController {
  constructor(
    @repository(MinaRepository) protected minaRepository: MinaRepository,
  ) { }

  @get('/minas/{id}/estados', {
    responses: {
      '200': {
        description: 'Array of Mina has many Estado through EstadoMina',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Estado>,
  ): Promise<Estado[]> {
    return this.minaRepository.estados(id).find(filter);
  }

  @post('/minas/{id}/estados', {
    responses: {
      '200': {
        description: 'create a Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Mina.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {
            title: 'NewEstadoInMina',
            exclude: ['id'],
          }),
        },
      },
    }) estado: Omit<Estado, 'id'>,
  ): Promise<Estado> {
    return this.minaRepository.estados(id).create(estado);
  }

  @patch('/minas/{id}/estados', {
    responses: {
      '200': {
        description: 'Mina.Estado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {partial: true}),
        },
      },
    })
    estado: Partial<Estado>,
    @param.query.object('where', getWhereSchemaFor(Estado)) where?: Where<Estado>,
  ): Promise<Count> {
    return this.minaRepository.estados(id).patch(estado, where);
  }

  @del('/minas/{id}/estados', {
    responses: {
      '200': {
        description: 'Mina.Estado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estado)) where?: Where<Estado>,
  ): Promise<Count> {
    return this.minaRepository.estados(id).delete(where);
  }
}
