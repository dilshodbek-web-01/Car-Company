import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repo';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async getOne(company, { id }) {
    return this.companyRepository.getOne(company, id);
  }

  async getCompanies({ id }) {
    return this.companyRepository.getCompanies(id);
  }

  async getCompany(company, { id }) {
    let result = await this.companyRepository.getOne(company, id);
    if (result.length == 0)
      return new NotFoundException(`Company ${company.id} not found!`);

    return result;
  }

  async createCompany(companyInfo, { id }) {
    let newCompany = await this.companyRepository.createCompany(
      companyInfo,
      id,
    );

    return {
      message: 'Created company',
    };
  }

  async deleteCompany(company, { id }) {
    let result = await this.companyRepository.deleteCompany(company, id);

    if (result.length === 0) {
      return new NotFoundException(`Company ${company.id} not found!`);
    }
    return {
      message: 'Company deleted!',
    };
  }

  async updateCompany(company, companyInfo, { id }) {
    let result = await this.companyRepository.updateCompany(
      company,
      companyInfo,
      id,
    );

    if (result.length === 0) {
      return new NotFoundException(`Company ${company.id} not found!`);
    }
    return {
      message: 'Company updated!',
    };
  }
}
