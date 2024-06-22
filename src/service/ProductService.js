import Product from "../model/Product.js";
import {
  verify_passwords_match,
  verify_user_exists,
  verify_field,
} from "../helpers/errorHandling.js";

export default class ProductService {
  // Define o método estático assíncrono 'create' com os parâmetros 'req', 'name', 'description', 'state' e 'purchased_at'
  static async create(id, name, description, state, purchased_at, files) {
    // Define a variável 'available' como true para indicar que o produto está disponível
    const available = true;

    // Verifica se o nome do produto foi fornecido
    verify_field(name, "O nome é obrigatório.", 422);

    // Verifica se a descrição do produto foi fornecida
    verify_field(description, "A descrição é obrigatória.", 422);

    // Verifica se o estado do produto foi fornecido
    verify_field(state, "O estado é obrigatório.", 422);

    // Verifica se a data de compra do produto foi fornecida
    verify_field(purchased_at, "A data de compra é obrigatória.", 422);

    // Inicializa um array para armazenar as imagens caso existam
    const images = files ? files : null;

    // Verifica se pelo menos uma imagem foi fornecida
    verify_field(images, "A imagem é obrigatória.", 422);

    // Cria uma nova instância de Product com os dados fornecidos, incluindo o ID do proprietário (user._id) e um array vazio de imagens
    const product = new Product({
      name,
      description,
      state,
      owner: id,
      available,
      images: [],
    });

    // Itera sobre o array de imagens e adiciona cada filename ao array de imagens do produto
    images.map((image) => product.images.push(image.filename));

    // Salva a nova instância de produto no banco de dados e aguarda a conclusão do processo
    const productSaved = await product.save();

    // Retorna o produto salvo como resultado da função
    return productSaved;
  }

  // Define o método estático assíncrono 'index' com os parâmetros 'page' e 'limit'
  static async index(page, limit) {
    // Busca todos os produtos no banco de dados, ordenados pela data de criação em ordem decrescente
    // Limita o número de produtos retornados ao valor de 'limit'
    // Pula um número de produtos calculado pela fórmula '(page-1) * limit' para paginação
    // Popula o campo 'owner' do produto, excluindo o campo 'password'
    // Popula também o campo 'receiver' do produto
    const products = await Product.find()
      .sort("-createdAt")
      .limit(limit)
      .skip((page - 1) * limit)
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    // Retorna a lista de produtos encontrados
    return products;
  }

  // Método para mostrar um produto pelo ID
  static async show(id) {
    verify_field(id, "ID é obrigatório.", 422);
    const product = await Product.findById(id)
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    if (!product) throwError("Produto não encontrado.", 404);
    return product;
  }

  // Método para atualizar um produto pelo ID
  static async update(id, name, description, state, purchased_at, files) {
    verify_field(id, "ID é obrigatório.", 422);
    const updateData = { name, description, state, purchased_at, images: [] };
    if (files) {
      updateData.images = files.map((image) => image.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    if (!updatedProduct) throwError("Produto não encontrado.", 404);
    return updatedProduct;
  }

  // Método para deletar um produto pelo ID
  static async delete(id) {
    verify_field(id, "ID é obrigatório.", 422);
    const product = await Product.findByIdAndDelete(id);
    if (!product) throwError("Produto não encontrado.", 404);
    return product;
  }

  // Método para mostrar produtos de um usuário específico
  static async showUserProducts(userId) {
    verify_field(userId, "ID do usuário é obrigatório.", 422);
    const products = await Product.find({ owner: userId })
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    return products;
  }

  // Método para mostrar produtos recebidos por um usuário específico
  static async showReceiverProducts(receiverId) {
    verify_field(receiverId, "ID do receptor é obrigatório.", 422);
    const products = await Product.find({ receiver: receiverId })
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    return products;
  }

  // Método para agendar um produto para doação
  static async schedule(id, scheduledDate) {
    verify_field(id, "ID é obrigatório.", 422);
    verify_field(scheduledDate, "Data de agendamento é obrigatória.", 422);
    const product = await Product.findByIdAndUpdate(
      id,
      { scheduled_at: scheduledDate, available: false },
      { new: true }
    )
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    if (!product) throwError("Produto não encontrado.", 404);
    return product;
  }

  // Método para concluir a doação de um produto
  static async concludeDonation(id) {
    verify_field(id, "ID é obrigatório.", 422);
    const product = await Product.findByIdAndUpdate(
      id,
      { donated_at: new Date(), available: false },
      { new: true }
    )
      .populate({ path: "owner", select: "-password" })
      .populate("receiver");

    if (!product) throwError("Produto não encontrado.", 404);
    return product;
  }
}
