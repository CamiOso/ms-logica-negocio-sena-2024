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
Perforista,
EquipoPerforista,
Equipo,
} from '../models';
import {PerforistaRepository} from '../repositories';

export class PerforistaEquipoController {
  constructor(
    @repository(PerforistaRepository) protected perforistaRepository: PerforistaRepository,
  ) { }

  @get('/perforistas/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Perforista has many Equipo through EquipoPerforista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo[]> {
    return this.perforistaRepository.equipos(id).find(filter);
  }

  @post('/perforistas/{id}/equipos', {
    responses: {
      '200': {
        description: 'create a Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Perforista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInPerforista',
            exclude: ['id'],
          }),
        },
      },
    }) equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.perforistaRepository.equipos(id).create(equipo);
  }

  @patch('/perforistas/{id}/equipos', {
    responses: {
      '200': {
        description: 'Perforista.Equipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Partial<Equipo>,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.perforistaRepository.equipos(id).patch(equipo, where);
  }

  @del('/perforistas/{id}/equipos', {
    responses: {
      '200': {
        description: 'Perforista.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.perforistaRepository.equipos(id).delete(where);
  }
}
