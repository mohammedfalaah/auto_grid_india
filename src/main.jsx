import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './layouts/Footer.jsx'
import Header from './layouts/Header.jsx'
import { Toaster } from 'react-hot-toast'
import Context_Provider from './services/Context.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Context_Provider>
<Header />
<Toaster />
<App />
<Footer />  
</Context_Provider>
</BrowserRouter>
  
)
