import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyType } from '../types/Property';
import { Search, Moon, Sun, Plus, Home } from 'lucide-react';

const Header: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    isDarkMode,
    toggleDarkMode,
    toggleForm
  } = usePropertyContext();

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo and Title */}
        <div className="logo">
          <Home className="icon-lg" style={{ marginRight: '0.75rem', color: '#2563eb' }} />
          Property Dashboard
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filters and Actions */}
        <div className="header-actions">
          {/* Property Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as PropertyType | 'All')}
            className="select"
          >
            <option value="All">All Types</option>
            {Object.values(PropertyType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="btn btn-secondary"
            style={{ padding: '0.5rem' }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="icon" style={{ color: '#f59e0b' }} />
            ) : (
              <Moon className="icon" style={{ color: '#6b7280' }} />
            )}
          </button>

          {/* Add Property Button */}
          <button
            onClick={toggleForm}
            className="btn btn-primary"
          >
            <Plus className="icon" />
            Add Property
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 