'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  List,
  LogOut,
  Menu,
  Plus,
  Save,
  Settings,
  X,
} from 'lucide-react';
import CreateTransaction from './createTransaction';
import { usePathname } from 'next/navigation';


export default function Header({
  isModalOpen,
  setIsModalOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isChatOpen,
  setIsChatOpen,
}: any) {
  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const [activeMenu, setActiveMenu] = useState('auth/home');

const pathname = usePathname();

function isRouteActive(currentRoute: string, target: string): boolean {
  return currentRoute.includes(target);
}


  const [userProfile, setUserProfile] = useState({
    name: 'Eugene',
    email: 'eugene@example.com',
    phone: '+233 24 123 4567',
    currency: 'GHS',
  });

  const profileMenuRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
  };
  console.log(document.body.offsetWidth)
  if(document.body.offsetWidth > 1000)
 { if (isProfileMenuOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };}
}, [isProfileMenuOpen]);


  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    setIsProfileModalOpen(false);
  };

  const ProfileModal = () => {
    const [editedProfile, setEditedProfile] = useState(userProfile);

    const handleSave = () => {
      handleProfileUpdate(editedProfile);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`rounded-lg shadow-xl w-full max-w-md bg-white`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Manage Profile</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 text-gray-700'}`}>Phone</label>
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 text-gray-700'}`}>Currency</label>
                <select
                  value={editedProfile.currency}
                  onChange={(e) => setEditedProfile({ ...editedProfile, currency: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300'
                  }`}
                >
                  <option value="GHS">GHS - Ghanaian Cedi</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileModalOpen(false);
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CategoriesModal = () => {
    const categories = [
      { name: 'Food & Transport', transactions: 15, amount: 'GHS 432.50', color: 'bg-red-500' },
      { name: 'Groceries', transactions: 8, amount: 'GHS 256.80', color: 'bg-green-500' },
      { name: 'Utilities', transactions: 12, amount: 'GHS 189.30', color: 'bg-blue-500' },
      { name: 'Entertainment', transactions: 6, amount: 'GHS 98.40', color: 'bg-purple-500' },
      { name: 'Healthcare', transactions: 4, amount: 'GHS 156.20', color: 'bg-orange-500' },
      { name: 'Shopping', transactions: 2, amount: 'GHS 45.90', color: 'bg-pink-500' },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCategoriesModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {category.transactions} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{category.amount}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Viewing details for ${category.name}`);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Adding new category...');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Category
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Mobile: Logo and Hamburger */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <h1 className="text-xl font-medium text-gray-900">Penny Wise</h1>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="lg:hidden bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
              onClick={handleAddTransaction}
            >
              <X className="w-4 h-4 rotate-45" />
            </button>
            <button
              className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center lg:hidden"
              ref={profileMenuRef}
              onClick={(e) => {
                e.preventDefault();
                setIsProfileMenuOpen((open) => !open);
              }}
            >
              <span className="text-blue-600 font-medium text-sm">E</span>
            </button>
            {isProfileMenuOpen && (
              <div
                className={`absolute right-1.5 mt-72 lg:hidden w-64 rounded-lg shadow-lg border z-50 ${'bg-white border-gray-200'}`}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`p-4 border-b ${'border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {userProfile.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-medium ${'text-gray-900'}`}>{userProfile.name}</p>
                      <p className={`text-sm ${'text-gray-500'}`}>{userProfile.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsProfileModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <Settings className="w-4 h-4" />
                    Manage Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsCategoriesModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <List className="w-4 h-4" />
                    Manage Categories
                  </button>

                  <div className={`border-t mt-2 pt-2 border-gray-200`}>
                    <button
                      onClick={() => {
                        alert('Signing out...');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-700 p-2"
            >
              <Menu size={35} />
            </button>
          </div>
        </div>

        {/* Desktop: Centered Navigation */}
        {!isChatOpen && (
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="/auth/home" className={`${isRouteActive(pathname, 'auth/home') ? 'text-gray-900': 'text-gray-500'} font-medium`}>
              Home
            </a>
            <a href="/auth/transactions" className={`${isRouteActive(pathname, 'auth/transactions') ? 'text-gray-900': 'text-gray-500'} hover:text-gray-900`}>
              Transactions
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              onClick={() => {
                setIsChatOpen(true);
              }}
            >
              AI Chatbot
            </a>
          </nav>
        )}

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center space-x-3">
          {isChatOpen && (
            <nav className="hidden lg:flex items-center space-x-8 left-1/3 transform -translate-x-1/2">
              <a href="/auth/home" className={`${isRouteActive(pathname, 'auth/home') ? 'text-gray-900': 'text-gray-500'} font-medium`}>
                Home
              </a>
              <a href="/auth/transactions" className={`${isRouteActive(pathname, 'auth/transactions') ? 'text-gray-900': 'text-gray-500'} hover:text-gray-900`}>
                Transactions
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900"
                onClick={() => {
                  setIsChatOpen(true);

                }}
              >
                AI Chatbot
              </a>
            </nav>
          )}
          <button
            onClick={handleAddTransaction}
            className="bg-[#0640ac] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Add New Transaction
          </button>
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileMenuOpen((open) => !open);
              }}
              className={`flex items-center gap-2 p-1 rounded-lg transition-colors`}
              aria-haspopup="true"
              aria-expanded={isProfileMenuOpen}
            >
              <div className="w-8 h-8 bg-[#0640ac] rounded-full flex items-center justify-center text-white font-medium">
                {userProfile.name.charAt(0)}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isProfileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isProfileMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50 ${'bg-white border-gray-200'}`}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`p-4 border-b ${'border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {userProfile.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-medium ${'text-gray-900'}`}>{userProfile.name}</p>
                      <p className={`text-sm ${'text-gray-500'}`}>{userProfile.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsProfileModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <Settings className="w-4 h-4" />
                    Manage Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsCategoriesModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <List className="w-4 h-4" />
                    Manage Categories
                  </button>
                  <div className={`border-t mt-2 pt-2 border-gray-200`}>
                    <button
                      onClick={() => {
                        alert('Signing out...');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="text-gray-700 font-medium">Eugene</span>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-2">
            <a href="/auth/home" className={`${isRouteActive(pathname, 'auth/home') ? 'text-gray-900': 'text-gray-500'} font-medium px-4 py-2`}>
              Home
            </a>
            <a href="/auth/transactions" className={`${isRouteActive(pathname, 'auth/transactions') ? 'text-gray-900': 'text-gray-500'} hover:text-gray-900 px-4 py-2`}>
              Transactions
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 px-4 py-2"
              onClick={() => {
                setIsChatOpen(true);
              }}
            >
              AI Chatbot
            </a>
          </nav>
        </div>
      )}
      {isModalOpen && (
        <CreateTransaction isModalOpen={isMobileMenuOpen} setIsModalOpen={setIsModalOpen} />
      )}
      {isProfileModalOpen && <ProfileModal />}
      {isCategoriesModalOpen && <CategoriesModal />}
    </div>
  );
}
