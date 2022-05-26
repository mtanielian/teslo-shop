import { loginUser } from "../../../lib/user"
import { singIn } from "../../../utils/jwt"

export default function handler (req, res) {
  switch (req.method) {
    case 'POST':
      return login(req, res)
      break
    default:
      return res.status(400).json({ message: 'Invalid method' })
  }
}


const login = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    const user = await loginUser({ email, password })
    if (!user)
      return res.status(400).json({ message: 'User not found' })
    
    const token = singIn({ user })
    return res.status(200).json({ token })
  
  } else {
    return res.status(500).json({ message: 'fallo algun parametro' })
  }

}