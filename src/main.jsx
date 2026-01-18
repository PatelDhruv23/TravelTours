import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import RootLayout from './routes/RootLayout.jsx'
import HomePage from './routes/Home.jsx'
import TripsPage from './routes/Trips.jsx'
import AboutPage from './routes/About.jsx'
import ContactPage from './routes/Contact.jsx'
import BookingPage from './routes/Booking.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'trips', element: <TripsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'book/:id', element: <BookingPage /> },
    ],
  },
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
