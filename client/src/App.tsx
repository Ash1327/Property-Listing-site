import React from 'react';
import { PropertyProvider } from './context/PropertyContext';
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import PropertyModal from './components/PropertyModal';
import AddPropertyForm from './components/AddPropertyForm';
import './App.css';

function App() {
  return (
    <PropertyProvider>
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <main className="container" style={{ padding: '2rem 0' }}>
          <PropertyList />
        </main>
        <PropertyModal />
        <AddPropertyForm />
      </div>
    </PropertyProvider>
  );
}

export default App;
