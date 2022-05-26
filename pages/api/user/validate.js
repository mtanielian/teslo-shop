import jwt from 'jsonwebtoken'


export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res)
      break
    default:
      return res.status(400).json({ message: 'Ivalid method' })
  }
}




const validateToken = async (req, res) => {
  const { token } = req.cookies

  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.JWT_SECRET)
      
      return res.status(200).json(user)
    } catch (error) {
      console.log('Error decode: ', error)
      return res.status(401).json({ message: 'Bad authentication'})
    }

  } else {
    return res.status(400).json({ message: 'Bad params - invalid token' })
  }
}