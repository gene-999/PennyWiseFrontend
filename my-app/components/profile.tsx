"use client"
// components/ProfileMenu.tsx
import React, { useEffect, useRef } from 'react';
import { ChevronDown, LogOut, List, Moon, Settings, Sun } from 'lucide-react';

export default function ProfileMenu({
  isOpen,
  setIsOpen,
  userProfile,
  setIsProfileModalOpen,
  setIsCategoriesModalOpen,
  toggleDarkMode,
  isDarkMode,
}: any) {
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={profileMenuRef}
      className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {userProfile.name}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {userProfile.email}
            </p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <button
          onClick={() => {
            setIsProfileModalOpen(true);
            setIsOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          Manage Profile
        </button>
        <button
          onClick={() => {
            setIsCategoriesModalOpen(true);
            setIsOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <List className="w-4 h-4" />
          Manage Categories
        </button>
        <button
          onClick={() => {
            toggleDarkMode();
            setIsOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className={`border-t mt-2 pt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => {
              alert('Signing out...');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
