import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { DataGrid } from "@mui/x-data-grid"

import { GroupOutlined } from '@mui/icons-material'
import { useFetchData } from '../../hooks/useSWR'
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { updateRoleUser } from '../../services/user.services'


const UsersPage = () => {
  const [ users, setUsers ] = useState([])
  const {data, error, isLoading} = useFetchData({ url: '/admin/user' })

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users)
    }
  }, [data])

  if (error) {
    return <>Error al cargar los usuarios</>
  }

  if (isLoading) {
    return <>loading......</>
  }

  const setNewRole = async (userId, role, checked) => {
    const usersPrev = users
    const usersUpdated = users.map((user) => {
      let roles = user.roles
      if (userId === user._id) {
        roles = checked ? user.roles.concat(role) : user.roles.filter(r => r !== role)
      }
      
      return ({
        ...user,
        roles
      })
    })
    
    setUsers(usersUpdated)

    try {
     await updateRoleUser({ userId, role })
    } catch (error) {
      console.log('Error updateRoleUser: ', error)
      setUsers(usersPrev)
    }
  }

  const rows = users.map( ({ _id, username, email, roles }, idx) => ({
    userId: _id,
    id: idx + 1,
    username,
    email,
    roles
  }))

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Usuario', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { 
      field: 'roles', 
      headerName: 'Roles', 
      description: 'Roles del usuario dentro del sistema',
      width: 400,
      renderCell: ({ row }) => {
        return (
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="user"
              control={<Checkbox />}
              label="Usuario"
              labelPlacement="start"
              checked={ row.roles.includes('user') }
              onChange={ ({ target }) => setNewRole( row.userId, target.value, target.checked ) }
            />
            <FormControlLabel
              value="admin"
              control={<Checkbox />}
              label="Admin"
              labelPlacement="start"
              checked={ row.roles.includes('admin') }
              onChange={ ({ target }) => setNewRole( row.userId, target.value, target.checked ) }
            />
            <FormControlLabel
              value="root"
              control={<Checkbox />}
              label="Root"
              labelPlacement="start"
              checked={ row.roles.includes('root') }
              onChange={ ({ target }) => setNewRole( row.userId, target.value, target.checked ) }
            />
          </FormGroup>
        )
      }
    },

  ]

  return (
    <AdminLayout
      title='Dashboard' 
      subTitle='Listado de usuarios'
      icon={ <GroupOutlined /> }
    >
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  
  )
}

export default UsersPage