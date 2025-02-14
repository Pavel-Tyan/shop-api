import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { dataSource } from "../data-source";

export class CategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Category | null> {
    return this.repository.findOneBy({ id: id });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.repository.create(categoryData);
    return this.repository.save(category);
  }

  async update(
    id: number,
    updatedCategory: Partial<Category>
  ): Promise<Category | null> {
    const category = await this.repository.findOneBy({ id: id });

    if (category) {
      this.repository.merge(category, updatedCategory);
      return this.repository.save(category);
    }

    return null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
