import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { dataSource } from "../data-source";
import { Product } from "../entities/product.entity";

export class CategoryRepository {
  private categoryRepository: Repository<Category>;
  private productRepository: Repository<Product>;

  constructor() {
    this.categoryRepository = dataSource.getRepository(Category);
    this.productRepository = dataSource.getRepository(Product);
  }

  async findAll(): Promise<Category[]> {
    return (await this.categoryRepository.find()).sort((a, b) => a.id - b.id);
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    updatedCategory: Partial<Category>
  ): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    const oldCategoryName = category?.name;

    if (category) {
      this.categoryRepository.merge(category, updatedCategory);

      const updatedCategoryName = updatedCategory.name;

      await this.productRepository.update(
        { category: oldCategoryName },
        { category: updatedCategoryName }
      );

      return this.categoryRepository.save(category);
    }

    return null;
  }

  async delete(id: number): Promise<boolean> {
    const category = await this.categoryRepository.findOneBy({ id: id });

    await this.productRepository.update(
      { category: category?.name },
      { category: "" }
    );

    const result = await this.categoryRepository.delete(id);

    return result.affected === 1;
  }
}
