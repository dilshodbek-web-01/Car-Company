import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class CompanyRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCompanies(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('companies').where({ created_by: id });
  }

  createCompany({ title, image }, id) {
    const knex = this.knexConfig.instance;

    return knex('companies').insert({
      title,
      image,
      created_by: id,
    });
  }

  getOne(company, id) {
    const knex = this.knexConfig.instance;

    return knex
      .select('*')
      .from('companies')
      .where({ id: company.id, created_by: id });
  }

  deleteCompany(company, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('companies')
        .returning('*')
        // .where({ id })
        .where({ id: company.id, created_by: id })
        .del()
    );
  }

  updateCompany(company, companyInfo, id) {
    const knex = this.knexConfig.instance;

    return knex('companies')
      .returning('*')
      .where({ id: company.id, created_by: id })
      .update(companyInfo);
  }
}
