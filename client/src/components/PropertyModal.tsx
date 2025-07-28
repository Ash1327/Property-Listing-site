import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { X, MapPin, Home, Calendar, Ruler } from 'lucide-react';

const PropertyModal: React.FC = () => {
  const { selectedProperty, isModalOpen, toggleModal } = usePropertyContext();

  if (!selectedProperty || !isModalOpen) return null;

  const formatPrice = (price: number | string) => {
    // If price is already a string, return it as is
    if (typeof price === 'string') {
      return price;
    }
    // If price is a number, format it as currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <img
            src={selectedProperty.image}
            alt={selectedProperty.name}
            className="modal-image"
          />
          <button
            onClick={toggleModal}
            className="modal-close"
          >
            <X className="icon" />
          </button>
          <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <span className="property-type-badge">
              {selectedProperty.type}
            </span>
          </div>
        </div>

        <div className="modal-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 className="modal-title">
              {selectedProperty.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#059669' }}>
                {formatPrice(selectedProperty.price)}
              </span>
            </div>
          </div>

          <div className="modal-details">
            <div className="modal-info">
              <div className="modal-info-item">
                <MapPin className="icon" style={{ marginRight: '0.75rem' }} />
                <span>{selectedProperty.location}</span>
              </div>
              
              {selectedProperty.bedrooms && selectedProperty.bathrooms && (
                <div className="modal-info-item">
                  <Home className="icon" style={{ marginRight: '0.75rem' }} />
                  <span>
                    {selectedProperty.bedrooms} Bedrooms, {selectedProperty.bathrooms} Bathrooms
                  </span>
                </div>
              )}
              
              {selectedProperty.area && (
                <div className="modal-info-item">
                  <Ruler className="icon" style={{ marginRight: '0.75rem' }} />
                  <span>{selectedProperty.area} sq ft</span>
                </div>
              )}
              
              <div className="modal-info-item">
                <Calendar className="icon" style={{ marginRight: '0.75rem' }} />
                <span>Listed on {formatDate(selectedProperty.createdAt)}</span>
              </div>
            </div>

            <div className="modal-description">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Property Details
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.625' }}>
                {selectedProperty.description}
              </p>
            </div>
          </div>

          <div className="modal-actions">
            <button
              onClick={toggleModal}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal; 