import React from 'react';
import { Property } from '../types/Property';
import { usePropertyContext } from '../context/PropertyContext';
import { Eye, MapPin, Home } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { setSelectedProperty, toggleModal } = usePropertyContext();

  const handleViewDetails = () => {
    setSelectedProperty(property);
    toggleModal();
  };

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

  return (
    <div className="property-card">
      <div style={{ position: 'relative' }}>
        <img
          src={property.image}
          alt={property.name}
          className="property-image"
        />
        <div className="property-type-badge">
          {property.type}
        </div>
      </div>
      
      <div className="property-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 className="property-title">
            {property.name}
          </h3>
        </div>
        
        <div className="property-location">
          <MapPin className="icon" style={{ marginRight: '0.25rem' }} />
          <span>{property.location}</span>
        </div>
        
        <div className="property-details">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="property-price">
              {formatPrice(property.price)}
            </span>
          </div>
          {property.bedrooms && property.bathrooms && (
            <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
              <Home className="icon" style={{ marginRight: '0.25rem' }} />
              <span style={{ fontSize: '0.875rem' }}>
                {property.bedrooms} bed, {property.bathrooms} bath
              </span>
            </div>
          )}
        </div>
        
        <p className="property-description">
          {property.description}
        </p>
        
        <button
          onClick={handleViewDetails}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Eye className="icon" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard; 