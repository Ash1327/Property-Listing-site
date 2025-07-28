import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyType } from '../types/Property';
import { apiService, ApiProperty, CreatePropertyData } from '../services/api';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  selectedProperty: Property | null;
  isDarkMode: boolean;
  searchTerm: string;
  selectedType: PropertyType | 'All';
  isModalOpen: boolean;
  isFormOpen: boolean;
  isLoading: boolean;
  error: string | null;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => Promise<void>;
  setSelectedProperty: (property: Property | null) => void;
  toggleModal: () => void;
  toggleForm: () => void;
  toggleDarkMode: () => void;
  setSearchTerm: (term: string) => void;
  setSelectedType: (type: PropertyType | 'All') => void;
  fetchProperties: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Helper function to convert API property to local Property type
const convertApiPropertyToProperty = (apiProperty: ApiProperty): Property => {
  return {
    id: apiProperty.id,
    name: apiProperty.name,
    type: apiProperty.type as PropertyType,
    price: apiProperty.price,
    location: apiProperty.location,
    description: apiProperty.description,
    image: apiProperty.image,
    bedrooms: apiProperty.bedrooms,
    bathrooms: apiProperty.bathrooms,
    area: apiProperty.area,
    createdAt: new Date(apiProperty.createdAt)
  };
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load dark mode preference from localStorage
    const saved = localStorage.getItem('dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter properties based on search term and selected type
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Fetch properties from API
  const fetchProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiProperties = await apiService.getProperties();
      const convertedProperties = apiProperties.map(convertApiPropertyToProperty);
      setProperties(convertedProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const createData: CreatePropertyData = {
        name: propertyData.name,
        type: propertyData.type,
        price: propertyData.price,
        location: propertyData.location,
        description: propertyData.description,
        image: propertyData.image,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area: propertyData.area
      };

      const newApiProperty = await apiService.createProperty(createData);
      const newProperty = convertApiPropertyToProperty(newApiProperty);
      
      setProperties(prev => [newProperty, ...prev]);
      toggleForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add property');
      console.error('Error adding property:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);
  const toggleForm = () => setIsFormOpen(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);

  // Apply dark mode to body and save preference
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const value: PropertyContextType = {
    properties,
    filteredProperties,
    selectedProperty,
    isDarkMode,
    searchTerm,
    selectedType,
    isModalOpen,
    isFormOpen,
    isLoading,
    error,
    addProperty,
    setSelectedProperty,
    toggleModal,
    toggleForm,
    toggleDarkMode,
    setSearchTerm,
    setSelectedType,
    fetchProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
}; 