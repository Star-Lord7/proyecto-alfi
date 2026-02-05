import * as userModel from "../models/userModel.js";

//Método para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para agregar un nuevo usuario
const addUser = async (req, res) => {
  try {
    const { email, password, rol, perfil } = req.body;
    const newUser = await userModel.createUser(email, password, rol, perfil);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para editar un usuario existente
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, rol, estado, perfil } = req.body;
    const updatedUser = await userModel.updateUser(
      id,
      email,
      password,
      rol,
      estado,
      perfil,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para eliminar un usuario
const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.deleteUser(id);
    res.status(200).json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUsers, getUserById, addUser, editUser, removeUser };
