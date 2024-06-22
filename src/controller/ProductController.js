import ProductService from "../service/ProductService.js";

export default class ProductController {
  // Define o método estático assíncrono 'create' com os parâmetros 'request' e 'response'
  static async create(request, response) {
    try {
      const { id } = request.user;
      // Extrai 'name', 'description', 'state', 'purchased_at'n e file do corpo da requisição (request.body)
      const { name, description, state, purchased_at, files } = request.body;

      // Chama o método 'create' do 'ProductService' passando os parâmetros necessários e aguarda a criação do produto
      const product = await ProductService.create(
        id,
        name,
        description,
        state,
        purchased_at,
        files
      );

      // Retorna uma resposta HTTP 201 (Created) com o produto criado em formato JSON
      response.status(201).json({ product });
    } catch (error) {
      // Se ocorrer um erro, define o status code do erro como o status code do erro lançado ou 500 (Internal Server Error) se não estiver definido
      error.statusCode = error.statusCode || 500;

      // Retorna uma resposta HTTP com o status code do erro e a mensagem de erro em formato JSON
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Define o método estático assíncrono 'index' com os parâmetros 'request' e 'response'
  static async index(request, response) {
    try {
      // Extrai 'page' e 'limit' dos parâmetros da query string da requisição (request.query)
      // Define valores padrão para 'page' como 1 e 'limit' como 10, caso não sejam fornecidos
      const { page = 1, limit = 10 } = request.query;

      // Chama o método 'index' do 'ProductService' passando 'page' e 'limit' e aguarda a obtenção dos produtos
      const products = await ProductService.index(page, limit);

      // Retorna uma resposta HTTP 200 (OK) com a lista de produtos em formato JSON
      response.status(200).json({ products });
    } catch (error) {
      // Se ocorrer um erro, define o status code do erro como o status code do erro lançado ou 500 (Internal Server Error) se não estiver definido
      error.statusCode = error.statusCode || 500;

      // Retorna uma resposta HTTP com o status code do erro e a mensagem de erro em formato JSON
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para mostrar um produto pelo ID
  static async show(request, response) {
    try {
      const { id } = request.params;
      const product = await ProductService.show(id);
      response.status(200).json({ product });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para atualizar um produto pelo ID
  static async update(request, response) {
    try {
      const { id } = request.params;
      const { name, description, state, purchased_at, files } = request.body;
      const updatedProduct = await ProductService.update(
        id,
        name,
        description,
        state,
        purchased_at,
        files
      );
      response.status(200).json({ updatedProduct });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para deletar um produto pelo ID
  static async delete(request, response) {
    try {
      const { id } = request.params;
      await ProductService.delete(id);
      response.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para mostrar produtos de um usuário específico
  static async showUserProducts(request, response) {
    try {
      const { userId } = request.params;
      const products = await ProductService.showUserProducts(userId);
      response.status(200).json({ products });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para mostrar produtos recebidos por um usuário específico
  static async showReceiverProducts(request, response) {
    try {
      const { receiverId } = request.params;
      const products = await ProductService.showReceiverProducts(receiverId);
      response.status(200).json({ products });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para agendar um produto para doação
  static async schedule(request, response) {
    try {
      const { id } = request.params;
      const { scheduledDate } = request.body;
      const product = await ProductService.schedule(id, scheduledDate);
      response.status(200).json({ product });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  // Método para concluir a doação de um produto
  static async concludeDonation(request, response) {
    try {
      const { id } = request.params;
      const product = await ProductService.concludeDonation(id);
      response.status(200).json({ product });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }
}
