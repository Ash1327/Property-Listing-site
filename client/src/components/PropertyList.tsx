import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import PropertyCard from './PropertyCard';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';

const PropertyList: React.FC = () => {
  const { filteredProperties, isLoading, error, fetchProperties } = usePropertyContext();

  if (isLoading && filteredProperties.length === 0) {
    return (
      <div className="empty-state">
        <Loader2 className="empty-icon" style={{ animation: 'spin 1s linear infinite' }} />
        <h3 className="empty-title">
          Loading properties...
        </h3>
        <p className="empty-text">
          Please wait while we fetch the latest property listings.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <AlertCircle className="empty-icon" style={{ color: '#ef4444' }} />
        <h3 className="empty-title">
          Error loading properties
        </h3>
        <p className="empty-text">
          {error}
        </p>
        <button
          onClick={fetchProperties}
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
        >
          <RefreshCw className="icon" />
          Try Again
        </button>
      </div>
    );
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="empty-state">
        <AlertCircle className="empty-icon" />
        <h3 className="empty-title">
          No properties found
        </h3>
        <p className="empty-text">
          Try adjusting your search criteria or property type filter.
        </p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {filteredProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList; 