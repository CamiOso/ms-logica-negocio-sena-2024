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
import {Mina} from '../models';
import {MinaRepository} from '../repositories';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {authenticate} from '@loopback/authentication';

export class MinaController {
  constructor(
    @repository(MinaRepository)
    public minaRepository : MinaRepository,
  ) {}

  @post('/mina')
  @response(200, {
    description: 'Mina model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mina)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mina, {
            title: 'NewMina',
            exclude: ['id'],
          }),
        },
      },
    })
    mina: Omit<Mina, 'id'>,
  ): Promise<Mina> {
    return this.minaRepository.create(mina);
  }

  @get('/mina/count')
  @response(200, {
    description: 'Mina model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mina) where?: Where<Mina>,
  ): Promise<Count> {
    return this.minaRepository.count(where);
  }


  @authenticate({
    strategy:'auth',
  options:[ConfiguracionSeguridad.menuMinasId,ConfiguracionSeguridad.listarAccion]})



  @get('/mina')
  @response(200, {
    description: 'Array of Mina model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mina, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mina) filter?: Filter<Mina>,
  ): Promise<Mina[]> {
    return this.minaRepository.find(filter);
  }

  @patch('/mina')
  @response(200, {
    description: 'Mina PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mina, {partial: true}),
        },
      },
    })
    mina: Mina,
    @param.where(Mina) where?: Where<Mina>,
  ): Promise<Count> {
    return this.minaRepository.updateAll(mina, where);
  }

  @get('/mina/{id}')
  @response(200, {
    description: 'Mina model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mina, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mina, {exclude: 'where'}) filter?: FilterExcludingWhere<Mina>
  ): Promise<Mina> {
    return this.minaRepository.findById(id, filter);
  }

  @patch('/mina/{id}')
  @response(204, {
    description: 'Mina PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mina, {partial: true}),
        },
      },
    })
    mina: Mina,
  ): Promise<void> {
    await this.minaRepository.updateById(id, mina);
  }

  @put('/mina/{id}')
  @response(204, {
    description: 'Mina PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mina: Mina,
  ): Promise<void> {
    await this.minaRepository.replaceById(id, mina);
  }

  @del('/mina/{id}')
  @response(204, {
    description: 'Mina DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.minaRepository.deleteById(id);
  }
}
