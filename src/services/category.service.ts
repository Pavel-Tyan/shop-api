import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../entities/category.entity";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    return this.categoryRepository.create(categoryData);
  }

  async updateCategory(
    id: number,
    updatedCategory: Partial<Category>
  ): Promise<Category | null> {
    return this.categoryRepository.update(id, updatedCategory);
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepository.delete(id);
  }
}
