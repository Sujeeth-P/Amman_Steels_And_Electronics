import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import EnquirySuccess from './pages/EnquirySuccess';
import CartDrawer from './components/CartDrawer';
import ChatBot from './components/ChatBot';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/ScrollToTop';

// Admin Components
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Enquiries from './pages/admin/Enquiries';
import ProductList from './pages/admin/ProductList';

function CustomerLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="products" element={<ProductList />} />
            <Route path="settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
          </Route>

          {/* Customer Routes */}
          <Route path="*" element={
            <CustomerLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/enquiry-success" element={<EnquirySuccess />} />
              </Routes>
            </CustomerLayout>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
