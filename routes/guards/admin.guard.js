exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) next();
  else
    res.status(403).render("notAdmin.ejs", {
      isUser: req.session.userId,
      isAdmin: false
    }); //forbidden
};
