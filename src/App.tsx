import React, { useState, useEffect } from 'react';
import { Sun, Moon, MapPin, Star, Users, Wifi, Car, Coffee, Bath } from 'lucide-react';

interface Stay {
  name: string;
  price: number;
  rating: number;
  guests: number;
}

interface Destination {
  id: number;
  city: string;
  country: string;
  image: string;
  stays: Stay[];
}

const TravelApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const destinations = [
    {
      id: 1,
      city: "Santorini",
      country: "Greece",
      image: "https://picsum.photos/800/600?random=1",
      stays: [
        { name: "Azure Cliff Villa", price: 320, rating: 4.9, guests: 4 },
        { name: "Sunset Dome House", price: 280, rating: 4.8, guests: 2 },
        { name: "White Stone Retreat", price: 450, rating: 4.7, guests: 6 }
      ]
    },
    {
      id: 2,
      city: "Kyoto",
      country: "Japan",
      image: "https://picsum.photos/800/600?random=2",
      stays: [
        { name: "Bamboo Garden Ryokan", price: 180, rating: 4.9, guests: 2 },
        { name: "Temple View Machiya", price: 220, rating: 4.8, guests: 4 },
        { name: "Zen Mountain Lodge", price: 160, rating: 4.6, guests: 3 }
      ]
    },
    {
      id: 3,
      city: "Bali",
      country: "Indonesia",
      image: "https://picsum.photos/800/600?random=3",
      stays: [
        { name: "Jungle Canopy Treehouse", price: 95, rating: 4.7, guests: 2 },
        { name: "Rice Terrace Villa", price: 140, rating: 4.8, guests: 4 },
        { name: "Ocean Breeze Bungalow", price: 120, rating: 4.6, guests: 3 }
      ]
    },
    {
      id: 4,
      city: "Reykjavik",
      country: "Iceland",
      image: "https://picsum.photos/800/600?random=4",
      stays: [
        { name: "Northern Lights Cabin", price: 200, rating: 4.9, guests: 2 },
        { name: "Glacier View Lodge", price: 180, rating: 4.7, guests: 4 },
        { name: "Thermal Springs Retreat", price: 240, rating: 4.8, guests: 3 }
      ]
    },
    {
      id: 5,
      city: "Marrakech",
      country: "Morocco",
      image: "https://picsum.photos/800/600?random=5",
      stays: [
        { name: "Desert Rose Riad", price: 110, rating: 4.6, guests: 2 },
        { name: "Atlas Mountain Kasbah", price: 150, rating: 4.8, guests: 4 },
        { name: "Medina Palace Suite", price: 190, rating: 4.7, guests: 3 }
      ]
    },
    {
      id: 6,
      city: "Patagonia",
      country: "Chile",
      image: "https://picsum.photos/800/600?random=6",
      stays: [
        { name: "Windswept Peak Lodge", price: 170, rating: 4.8, guests: 4 },
        { name: "Glacier Trail Cabin", price: 130, rating: 4.7, guests: 2 },
        { name: "Estancia Wilderness", price: 200, rating: 4.9, guests: 6 }
      ]
    },
    {
      id: 7,
      city: "Maldives",
      country: "Maldives",
      image: "https://picsum.photos/800/600?random=7",
      stays: [
        { name: "Coral Lagoon Villa", price: 580, rating: 4.9, guests: 2 },
        { name: "Overwater Paradise", price: 720, rating: 4.8, guests: 2 },
        { name: "Sunset Atoll Retreat", price: 650, rating: 4.9, guests: 4 }
      ]
    },
    {
      id: 8,
      city: "Tuscany",
      country: "Italy",
      image: "https://picsum.photos/800/600?random=8",
      stays: [
        { name: "Vineyard Hill Estate", price: 280, rating: 4.8, guests: 6 },
        { name: "Olive Grove Farmhouse", price: 220, rating: 4.7, guests: 4 },
        { name: "Renaissance Villa", price: 340, rating: 4.9, guests: 8 }
      ]
    }
  ];

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Car, label: "Parking" },
    { icon: Coffee, label: "Kitchen" },
    { icon: Bath, label: "Hot Tub" }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openDestinationModal = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-black/20 border-gray-700' 
          : 'bg-white/30 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-indigo-600' : 'bg-indigo-500'
            }`}>
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Wanderlust
            </h1>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                : 'bg-gray-800/20 text-gray-700 hover:bg-gray-800/30'
            }`}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Next{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Adventure
            </span>
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore unique stays in the world's most breathtaking destinations
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => openDestinationModal(destination)}
              className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                darkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-indigo-500' 
                  : 'bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <p className="font-semibold text-lg">{destination.city}</p>
                  <p className="text-sm">{destination.country}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{destination.city}</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {destination.country}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {destination.stays.length} stays available
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    From ${Math.min(...destination.stays.map(s => s.price))}/night
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedDestination && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={closeModal}
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <div 
              className={`max-w-4xl w-full rounded-3xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-2xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedDestination.image}
                  alt={`${selectedDestination.city}, ${selectedDestination.country}`}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <button
                  onClick={closeModal}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 ${
                    darkMode ? 'bg-black/50 text-white hover:bg-black/70' : 'bg-white/80 text-gray-800 hover:bg-white'
                  }`}
                >
                  ×
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <h2 className="text-3xl font-bold">{selectedDestination.city}</h2>
                  <p className="text-lg">{selectedDestination.country}</p>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Available Stays</h3>
                <div className="space-y-6">
                  {selectedDestination.stays.map((stay, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border transition-all duration-200 hover:scale-102 ${
                        darkMode 
                          ? 'bg-gray-700/50 border-gray-600 hover:border-indigo-500' 
                          : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{stay.name}</h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{stay.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{stay.guests} guests</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600">
                            ${stay.price}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            per night
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        {amenities.map((amenity, i) => (
                          <div
                            key={i}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm ${
                              darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            <amenity.icon className="w-4 h-4" />
                            <span>{amenity.label}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transform">
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelApp;