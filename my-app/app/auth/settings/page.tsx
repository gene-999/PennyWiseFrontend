"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, User, LogOut, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    if (localStorage.theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
      return newMode;
    });
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCategoriesModalOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            My App
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 relative">
          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Button>

            {isProfileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2"
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
        <Card className="w-96 p-4 dark:bg-gray-800">
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Welcome to the App
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore features using the navbar above.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setIsProfileModalOpen(false)}
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              User Profile
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Name: John Doe
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: john@example.com
            </p>
          </div>
        </motion.div>
      )}

      {/* Categories Modal */}
      {isCategoriesModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setIsCategoriesModalOpen(false)}
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Categories
            </h3>
            <ul className="mt-2 space-y-2">
              <li className="text-gray-700 dark:text-gray-300">Category 1</li>
              <li className="text-gray-700 dark:text-gray-300">Category 2</li>
              <li className="text-gray-700 dark:text-gray-300">Category 3</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
