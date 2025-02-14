import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { dataSource } from "../data-source";

export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(limit: number, offset: number): Promise<Product[]> {
    return this.repository.find({ skip: offset, take: limit });
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOneBy({ id: id });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.repository.create(productData);
    return this.repository.save(product);
  }

  async update(
    id: number,
    updatedProduct: Partial<Product>
  ): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id: id });

    if (product) {
      this.repository.merge(product, updatedProduct);
      return this.repository.save(product);
    }

    return null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
