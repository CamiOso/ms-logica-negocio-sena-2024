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
Pozo,
PozoVeta,
Veta,
} from '../models';
import {PozoRepository} from '../repositories';

export class PozoVetaController {
  constructor(
    @repository(PozoRepository) protected pozoRepository: PozoRepository,
  ) { }

  @get('/pozos/{id}/vetas', {
    responses: {
      '200': {
        description: 'Array of Pozo has many Veta through PozoVeta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Veta>,
  ): Promise<Veta[]> {
    return this.pozoRepository.vetas(id).find(filter);
  }

  @post('/pozos/{id}/vetas', {
    responses: {
      '200': {
        description: 'create a Veta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Veta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pozo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veta, {
            title: 'NewVetaInPozo',
            exclude: ['id'],
          }),
        },
      },
    }) veta: Omit<Veta, 'id'>,
  ): Promise<Veta> {
    return this.pozoRepository.vetas(id).create(veta);
  }

  @patch('/pozos/{id}/vetas', {
    responses: {
      '200': {
        description: 'Pozo.Veta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veta, {partial: true}),
        },
      },
    })
    veta: Partial<Veta>,
    @param.query.object('where', getWhereSchemaFor(Veta)) where?: Where<Veta>,
  ): Promise<Count> {
    return this.pozoRepository.vetas(id).patch(veta, where);
  }

  @del('/pozos/{id}/vetas', {
    responses: {
      '200': {
        description: 'Pozo.Veta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Veta)) where?: Where<Veta>,
  ): Promise<Count> {
    return this.pozoRepository.vetas(id).delete(where);
  }
}
