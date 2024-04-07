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
Equipo,
PerforistaPerforacion,
Perforista,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoPerforistaController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/perforistas', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Perforista through PerforistaPerforacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perforista)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Perforista>,
  ): Promise<Perforista[]> {
    return this.equipoRepository.perforistas(id).find(filter);
  }

  @post('/equipos/{id}/perforistas', {
    responses: {
      '200': {
        description: 'create a Perforista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perforista)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {
            title: 'NewPerforistaInEquipo',
            exclude: ['id'],
          }),
        },
      },
    }) perforista: Omit<Perforista, 'id'>,
  ): Promise<Perforista> {
    return this.equipoRepository.perforistas(id).create(perforista);
  }

  @patch('/equipos/{id}/perforistas', {
    responses: {
      '200': {
        description: 'Equipo.Perforista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {partial: true}),
        },
      },
    })
    perforista: Partial<Perforista>,
    @param.query.object('where', getWhereSchemaFor(Perforista)) where?: Where<Perforista>,
  ): Promise<Count> {
    return this.equipoRepository.perforistas(id).patch(perforista, where);
  }

  @del('/equipos/{id}/perforistas', {
    responses: {
      '200': {
        description: 'Equipo.Perforista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Perforista)) where?: Where<Perforista>,
  ): Promise<Count> {
    return this.equipoRepository.perforistas(id).delete(where);
  }
}
