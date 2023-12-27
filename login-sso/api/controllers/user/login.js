module.exports = async function (req, res, proceed) {
    const { email } = req.allParams();
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          error: `${email} not found`,
        });
      } else {
        res.status(201).json({ message: 'login done' });
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };