import Head from "next/head"
import NavBar from "../navBar"
import SideMenu from "../sideMenu/SideMenu"


const MainLayout = ({ children, title = 'Teslo Shop', pageDescription = '', imageFullUrl = '' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
        
        {Boolean(imageFullUrl) && 
          <meta name='og:image' content={imageFullUrl} />
        }
      </Head>
      
      <NavBar />
      <SideMenu />
      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      
      }}>
        {children}
      </main>
      <footer>
        {/* custom footer */}
      </footer>
    </>
  )
}

export default MainLayout