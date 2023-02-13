const Repairs = require('../models/repairs.model');

const findRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      attributes: ['id', 'date', 'userId'],
      where: {
        status: 'pending',
      },
    });

    return res.status(200).json({
      status: 'success',
      repairs,
    });
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

const findRepairsById = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    return res.status(200).json({
      status: 'success find',
      repair,
    });
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wront',
    });
  }
};

const createRepairs = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newRepair = await Repairs.create({ date, userId });

    return res.status(201).json({
      status: 'success',
      message: 'Created repair',
      newRepair,
    });
  } catch {
    return res.status(500).json({
      status: 'error',
      message: 'something went very wrong',
    });
  }
};

const updateRepairsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    await repair.update({ status });

    return res.status(200).json({
      status: 'success',
    });
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wront',
    });
  }
};

const deleteRepairs = async (req, res) => {
  try {
    const { id } = rep.params;
    const { status } = rep.body;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not  faind',
      });
    }

    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
    });
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wront',
    });
  }
};

// const updateUsers = (req, res) => {
//     res.json({
//       status: 'success update',
//     });
//   };

module.exports = {
  findRepairs,
  findRepairsById,
  createRepairs,
  updateRepairsById,
  deleteRepairs,
};
