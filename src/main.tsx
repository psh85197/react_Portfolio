import App from '@/App'
import '@/index.css'
import ReactDOM from 'react-dom/client'
import './i18n/config';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 // <React.StrictMode>
   <BrowserRouter>
     <I18nextProvider i18n={i18n}>
       <App />
     </I18nextProvider>
   </BrowserRouter>
 // </React.StrictMode>
)