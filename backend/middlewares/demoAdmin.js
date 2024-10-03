const demoAdmin = (req, res, next) => {
  if (req.user.id === "66ff0d02d65a2a9ac5d001ce") {
    return res.status(403).json({
      data: null,
      message:
        "Demo Admin cannot perform this action is read-only in some actions",
    });
  } else {
    next();
  }
};

module.exports = demoAdmin;
