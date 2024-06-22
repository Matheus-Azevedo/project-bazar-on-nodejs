import User from "../model/User.js";
import bcrypt from "bcrypt";
import {
  verify_passwords_match,
  verify_user_exists,
  verify_field,
} from "../helpers/errorHandling.js";

export default class UserService {
  static async register(
    name,
    email,
    password,
    confirmPassword,
    phone,
    address
  ) {
    verify_field(name, "Name is required", 422);
    verify_field(email, "Email is required", 422);
    verify_field(password, "Password is required", 422);
    verify_field(confirmPassword, "Confirm Password is required", 422);
    verify_field(phone, "Phone is required", 422);
    verify_field(address, "Address is required", 422);

    verify_passwords_match(password, confirmPassword);

    const user = await User.findOne({ email });

    verify_user_exists(user, "User already exists", 409);

    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHashed,
      phone,
      address,
    });

    const userSaved = await newUser.save();

    return userSaved;
  }

  static async login(email, password) {
    verify_field(email, "Email is required", 422);
    verify_field(password, "Password is required", 422);

    const user = await User.findOne({ email });

    verify_user_exists(!user, "Email is incorrect", 401);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    verify_field(isPasswordCorrect, "Email or Password is incorrect", 401);

    return user;
  }

  static async getMyUser(id) {
    const user = await User.findById(id).select("-password");

    verify_user_exists(!user, "User not found", 404);

    return user;
  }

  static async updateMyUser(
    id,
    name,
    email,
    password,
    confirmPassword,
    phone,
    address,
    file
  ) {
    verify_field(name, "Name is required", 422);
    verify_field(email, "Email is required", 422);
    verify_field(password, "Password is required", 422);
    verify_field(confirmPassword, "Confirm Password is required", 422);
    verify_field(phone, "Phone is required", 422);
    verify_field(address, "Address is required", 422);

    verify_passwords_match(password, confirmPassword);

    const user = await User.findById(id);

    verify_user_exists(!user, "User not found", 404);

    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(password, salt);

    user.name = name;
    user.email = email;
    user.password = passwordHashed;
    user.phone = phone;
    user.address = address;
    user.image = file ? file.filename : user.image;

    const userUpdated = await user
      .findByIdAndUpdate(id, user, { new: true })
      .select("-password");

    return userUpdated;
  }
}
