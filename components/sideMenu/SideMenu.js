import { useContext, useState } from 'react'
import { UiContext } from '../../contexts/UiContext'
import { AuthContext } from '../../contexts/AuthContext'
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'


const SideMenu = () => {
  const [searchText, setSearchText] = useState('')
  const { uiContextState, setUiContextState } = useContext(UiContext)
  const { openMenu = false } = uiContextState
  const { isLogged, user, logout } = useContext(AuthContext)
  const router = useRouter()

  const goTo = (url) => {
    setUiContextState({...uiContextState, openMenu: false})
    router.push(url)
  }

  const onSearch = () => {
    if (searchText.trim().length === 0) return

    goTo(`/search/${searchText}`)
  }

  return (
    <Drawer
        open={ openMenu }
        onClose={ () => { setUiContextState({...uiContextState, openMenu: false})} }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            <List>
                <ListItem>
                    <Input
                        type='text'
                        value={ searchText }
                        onChange={ e => setSearchText(e.target.value) }
                        onKeyPress={ e => e.key === 'Enter' ? onSearch() : null }
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearch }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>
                { isLogged &&
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItem>}

                { isLogged &&
                <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItem>}


                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                  onClick={() => goTo('/products/men')}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                  onClick={() => goTo('/products/women')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                 onClick={() => goTo('/products/kid')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>

                { !isLogged 
                    ?
                    <ListItem button
                        onClick={() => goTo(`/auth/login?p=${router.asPath}`)}
                    >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>
                    :
                    <ListItem button onClick={logout}>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>
                }

                { isLogged && Boolean(user) && user.roles.includes('admin') &&
                <>
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>
                    <ListItem button
                        onClick={ () => goTo('/admin/dashboard') }>
                        <ListItemIcon>
                            <DashboardOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button
                        onClick={() => goTo('/admin/products')}
                    >
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItem>
                    <ListItem button
                        onClick={() => goTo('/admin/orders')}
                    >
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItem>

                    <ListItem button 
                        onClick={() => goTo('/admin/users')}
                    >
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>
                </>}
            </List>
        </Box>
    </Drawer>
  )
}


export default SideMenu