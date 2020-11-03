const jws = require("jsonwebtoken");

module.exports = {
  tokenProtection: (req, res, next) => {
    try {
      const token = jws.decode(req.body.token);

      if (token.isAdmin) {
        next();
      } else {
        res.sendStatus(403).send("Forbidden");
        return;
      }
    } catch (err) {
      res.sendStatus(403).send("Forbidden");
      return;
    }
  },
};
