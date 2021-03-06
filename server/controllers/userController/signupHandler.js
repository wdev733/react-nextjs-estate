import { User } from 'models'
import { hashSync } from 'bcrypt'
import {
  userValidation, createToken, createId
} from 'utils'
import mail from 'mail'

export default (req, res) => {
  const {
    name, phone, email,
    password, location
  } = req.body;

  userValidation({name, phone, email, password})
    .then(({isValid, errors}) => {
      if (!isValid) {
        return res.status(400).json({
          errors: {
            ...errors,
            formImport: true
          }
        })
      }

      const verifyToken = createId();
      const user = new User({
        name, phone, email,
        password_digest: hashSync(password, 10),
        verifyToken, location
      });

      user.save().then(data => {
        const token = createToken(data);
        return User.findByIdAndUpdate((data._id || data.id), {token})
          .then(() => {
            res.status(200).json({
              success: true,
              data: {token}
            })
            mail.verify({
              id: verifyToken,
              email,
              name
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err
            })
          })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      })
    })
};
