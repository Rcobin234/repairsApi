const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      where: {
        status: 'available',
      },
    });

    return res.status(200).json({
      status: 'success finds',
      message: 'The products found were successfully',
      users,
    });
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      attributes: ['id', 'name', 'email'],
      where: {
        id,
        status: 'available',
      },
    });

    if (user == null) {
      return res.status(404).json({
        status: 'error',
        message: 'The product was not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User fund',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: password.toLowerCase(),
      role,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created',
      newUser,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The product was not found',
      });
    }

    const updateUser = await user.update({
      name,
      email,
    });

    res.status(200).json({
      status: 'success update',
      message: 'The User was beend updated successfull',
      updateUser,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The product was not found',
      });
    }

    user.update({ status: 'disabled' });

    res.json({
      status: 'success delete',
      message: 'The product was beend deleted successfully',
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};

// const updateUsers = (req, res) => {
//     res.json({
//       status: 'success update',
//     });
//   };

module.exports = {
  findUserById,
  findUsers,
  createUser,
  deleteUser,
  updateUserById,
};
