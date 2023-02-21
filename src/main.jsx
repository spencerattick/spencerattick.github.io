import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Loading from './Loading'


  ReactDOM.createRoot(document.getElementById('loading')).render(
    <React.StrictMode>
      <Loading />
    </React.StrictMode>,
  )


setTimeout(() => {
    document.getElementById('loading').remove();
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )  
}, 1000)





