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
import {Trayectoria} from '../models';
import {TrayectoriaRepository} from '../repositories';

export class TrayectoriaController {
  constructor(
    @repository(TrayectoriaRepository)
    public trayectoriaRepository : TrayectoriaRepository,
  ) {}

  @post('/trayectoria')
  @response(200, {
    description: 'Trayectoria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Trayectoria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trayectoria, {
            title: 'NewTrayectoria',
            exclude: ['id'],
          }),
        },
      },
    })
    trayectoria: Omit<Trayectoria, 'id'>,
  ): Promise<Trayectoria> {
    return this.trayectoriaRepository.create(trayectoria);
  }

  @get('/trayectoria/count')
  @response(200, {
    description: 'Trayectoria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Trayectoria) where?: Where<Trayectoria>,
  ): Promise<Count> {
    return this.trayectoriaRepository.count(where);
  }

  @get('/trayectoria')
  @response(200, {
    description: 'Array of Trayectoria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Trayectoria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Trayectoria) filter?: Filter<Trayectoria>,
  ): Promise<Trayectoria[]> {
    return this.trayectoriaRepository.find(filter);
  }

  @patch('/trayectoria')
  @response(200, {
    description: 'Trayectoria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trayectoria, {partial: true}),
        },
      },
    })
    trayectoria: Trayectoria,
    @param.where(Trayectoria) where?: Where<Trayectoria>,
  ): Promise<Count> {
    return this.trayectoriaRepository.updateAll(trayectoria, where);
  }

  @get('/trayectoria/{id}')
  @response(200, {
    description: 'Trayectoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Trayectoria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Trayectoria, {exclude: 'where'}) filter?: FilterExcludingWhere<Trayectoria>
  ): Promise<Trayectoria> {
    return this.trayectoriaRepository.findById(id, filter);
  }

  @patch('/trayectoria/{id}')
  @response(204, {
    description: 'Trayectoria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trayectoria, {partial: true}),
        },
      },
    })
    trayectoria: Trayectoria,
  ): Promise<void> {
    await this.trayectoriaRepository.updateById(id, trayectoria);
  }

  @put('/trayectoria/{id}')
  @response(204, {
    description: 'Trayectoria PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() trayectoria: Trayectoria,
  ): Promise<void> {
    await this.trayectoriaRepository.replaceById(id, trayectoria);
  }

  @del('/trayectoria/{id}')
  @response(204, {
    description: 'Trayectoria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.trayectoriaRepository.deleteById(id);
  }
}
