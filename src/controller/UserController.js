import UserService from "../service/UserService.js";
import { createToken } from "../helpers/managerJwt.js";

export default class UserController {
  static async register(request, response) {
    try {
      const { name, email, password, confirmPassword, phone, address } =
        request.body;
      const user = await UserService.register(
        name,
        email,
        password,
        confirmPassword,
        phone,
        address
      );
      const token = createToken(user);
      response.status(201).json({ token: token, userId: user.id });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  static async login(request, response) {
    try {
      const { email, password } = request.body;
      const user = await UserService.login(email, password);
      const token = createToken(user);
      response.status(200).json({ token: token, userId: user.id });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  static async getMyUser(request, response) {
    try {
      const { id } = request.user;
      const user = await UserService.getMyUser(id);
      response.status(200).json(user);
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }

  static async updateMyUser(request, response) {
    try {
      const { id } = request.user;
      const { name, email, password, confirmPassword, phone, address, file } =
        req.body;

      const user = await UserService.updateMyUser(
        id,
        name,
        email,
        password,
        confirmPassword,
        phone,
        address,
        file
      );
      response.status(200).json(user);
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      response.status(error.statusCode).json({ error: error.message });
    }
  }
}
