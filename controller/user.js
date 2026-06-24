exports.getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};
