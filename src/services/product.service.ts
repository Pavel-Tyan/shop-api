import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../entities/product.entity";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(limit: number, offset: number): Promise<Product[]> {
    return this.productRepository.findAll(limit, offset);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    return this.productRepository.create(productData);
  }

  async updateProduct(
    id: number,
    updatedProduct: Partial<Product>
  ): Promise<Product | null> {
    return this.productRepository.update(id, updatedProduct);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}
