const isLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('http://localhost:3001/');
  }
};

module.exports = isLogged;
