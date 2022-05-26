import { registerUser } from "../../../lib/user"
import { singIn } from "../../../utils/jwt"


export default function handler (req, res) {
  switch (req.method) {
    case 'POST':
      return register(req, res)
      break
    default:
      return res.status(400).json({ message: 'Method invalid' })
  }
}


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (Boolean(username) && Boolean(email) && Boolean(password)) {
      const user = await registerUser({ username, email, password })
      const token = singIn({ user })

      return res.status(201).json({ token })
    }

    return res.status(400).json({ message: 'Bad params' })
  } catch (error) {
    console.log('regiter error: ', error)
    return res.status(500).json({ message: 'Server Error' })
  }
}