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
import {Veta} from '../models';
import {VetaRepository} from '../repositories';


export class VetaController {
  constructor(
    @repository(VetaRepository)
    public vetaRepository : VetaRepository,
  ) {}

  @post('/veta')
  @response(200, {
    description: 'Veta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veta, {
            title: 'NewVeta',
            exclude: ['id'],
          }),
        },
      },
    })
    veta: Omit<Veta, 'id'>,
  ): Promise<Veta> {
    return this.vetaRepository.create(veta);
  }

  @get('/veta/count')
  @response(200, {
    description: 'Veta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veta) where?: Where<Veta>,
  ): Promise<Count> {
    return this.vetaRepository.count(where);
  }







  @get('/veta')
  @response(200, {
    description: 'Array of Veta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veta) filter?: Filter<Veta>,
  ): Promise<Veta[]> {
    return this.vetaRepository.find(filter);
  }

  @patch('/veta')
  @response(200, {
    description: 'Veta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veta, {partial: true}),
        },
      },
    })
    veta: Veta,
    @param.where(Veta) where?: Where<Veta>,
  ): Promise<Count> {
    return this.vetaRepository.updateAll(veta, where);
  }

  @get('/veta/{id}')
  @response(200, {
    description: 'Veta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Veta, {exclude: 'where'}) filter?: FilterExcludingWhere<Veta>
  ): Promise<Veta> {
    return this.vetaRepository.findById(id, filter);
  }

  @patch('/veta/{id}')
  @response(204, {
    description: 'Veta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veta, {partial: true}),
        },
      },
    })
    veta: Veta,
  ): Promise<void> {
    await this.vetaRepository.updateById(id, veta);
  }

  @put('/veta/{id}')
  @response(204, {
    description: 'Veta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() veta: Veta,
  ): Promise<void> {
    await this.vetaRepository.replaceById(id, veta);
  }

  @del('/veta/{id}')
  @response(204, {
    description: 'Veta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vetaRepository.deleteById(id);
  }
}
