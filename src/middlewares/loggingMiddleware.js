const loggingMiddleware = (req, res, next) => {
  console.log("req:", req.url);
  next()
}

module.exports = loggingMiddleware
