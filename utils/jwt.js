import jwt from 'jsonwebtoken'


export const singIn = ({ user }) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET)
  return token
}