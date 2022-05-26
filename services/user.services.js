import api from './api'

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post('/user/login', { email, password })
  return data
}

export const registerUser = async ({ username, email, password }) => {
  const { data } = await api.post('/user/register', { username, email, password })
  return data
}


export const updateRoleUser = async ({ userId, role }) => {
  const { data } = await api.put('/admin/user', { userId, role })
  return data
}