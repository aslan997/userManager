const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      email,
      role,
      sortField = 'name',
      sortOrder = 'asc',
    } = req.query;

    const query = {};
    if (email) query.email = new RegExp(email, 'i');
    if (role) query.role = role;

    const sort = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

    const users = await User.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({ data: users, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
