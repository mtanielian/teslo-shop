import { getUsers, updateRoleUser } from "../../../lib/user"

export default function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getAllUsers(req, res)
      break
    case 'PUT':
      return updateUser(req, res)
      break
    default:
      res.status(400).json({ message: 'Invalid Method' })
  }
}



const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json({ users })
  } catch (error) {
    console.log('Error getUsers: ', error)
    res.status(500).json({ message: 'Internal Error '})
  }
}


const updateUser = async (req, res) => {
  try {
    const { userId, role } = req.body
    await updateRoleUser({ userId, role })
    res.status(200).json({ message: 'User updated' })
  } catch (error) {
    console.log('Error getUsers: ', error)
    res.status(500).json({ message: 'Internal Error '})
  }
}