const adminAuth = (req, res, next) => {
  console.log("Admin is getting checked");
  const token = "xyssz";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(401).send("NOT ADMIN");
  } else {
    next();
  }
};
module.exports = {
    adminAuth
}
