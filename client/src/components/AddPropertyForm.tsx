import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyType } from '../types/Property';
import { X, Plus, Home, DollarSign, MapPin, FileText, Loader2 } from 'lucide-react';

const AddPropertyForm: React.FC = () => {
  const { isFormOpen, toggleForm, addProperty, isLoading } = usePropertyContext();
  const [formData, setFormData] = useState({
    name: '',
    type: PropertyType.HOUSE,
    price: '',
    location: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      name: formData.name,
      type: formData.type,
      price: formData.price, // Keep as string to allow any value
      location: formData.location,
      description: formData.description,
      image: formData.image,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      area: formData.area ? parseInt(formData.area) : undefined
    };

    try {
      await addProperty(propertyData);
      // Form will be closed by the context after successful addition
      setFormData({
        name: '',
        type: PropertyType.HOUSE,
        price: '',
        location: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
        bedrooms: '',
        bathrooms: '',
        area: ''
      });
    } catch (error) {
      // Error is handled by the context
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isFormOpen) return null;

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2 className="form-title">
            <Plus className="icon" />
            Add New Property
          </h2>
          <button
            onClick={toggleForm}
            style={{ color: '#6b7280', cursor: 'pointer' }}
            disabled={isLoading}
          >
            <X className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Property Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter property name"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Property Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="form-input"
                disabled={isLoading}
              >
                {Object.values(PropertyType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Price *
              </label>
              <div style={{ position: 'relative' }}>
                <DollarSign className="icon" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter price (e.g., $250,000, 250k, etc.)"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Location *
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin className="icon" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter location"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Bedrooms
              </label>
              <div style={{ position: 'relative' }}>
                <Home className="icon" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Number of bedrooms"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="form-input"
                placeholder="Number of bathrooms"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Area (sq ft)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                min="0"
                className="form-input"
                placeholder="Square footage"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Description *
            </label>
            <div style={{ position: 'relative' }}>
              <FileText className="icon" style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#9ca3af' }} />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="form-input form-textarea"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter property description"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={toggleForm}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="icon" style={{ animation: 'spin 1s linear infinite' }} />
                  Adding Property...
                </>
              ) : (
                'Add Property'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm; 