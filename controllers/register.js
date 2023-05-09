const handleRegister = (req, res, db, bcrypt, saltRounds) => {
  const { email, name, password } = req.body;

  // Check if any required field is missing
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  // Generate salt and hash the password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  // Use transaction to ensure atomicity of database operations
  db.transaction((trx) => {
    trx.insert({
      hash: hash,
      email: email,
    })
    .into('login')
    .returning('email')
    .then((loginEmail) => {
      return trx.insert({
        email: loginEmail[0].email,
        name: name,
        joined: new Date(),
      })
      .into('users')
      .returning('*');
    })
    .then((user) => {
      res.json(user[0]);
    })
    .then(trx.commit)
    .catch(trx.rollback);
  })
  .catch((err) => {
    res.status(400).json('Unable to register');
  });
};

export default handleRegister;
