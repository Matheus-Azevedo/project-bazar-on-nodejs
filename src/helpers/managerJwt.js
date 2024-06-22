import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const verifyToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
};

export const verifyJWT = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const user = verifyToken(token);
    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({ error: "Unauthorized" });
  }
};
