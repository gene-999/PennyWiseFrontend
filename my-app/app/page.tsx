'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const PennyWiseHomepage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Navigation - Matching exact style from screenshots */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold text-gray-900">Penny Wise</div>
            <div className="flex items-center gap-3">
              <button
                className="px-5 py-2.5 text-gray-700 bg-gray-100 border-gray-100 border-dashed border rounded-lg hover:text-gray-900 font-medium transition-colors"
                onClick={() => {
                  router.push('/auth/login');
                }}
              >
                Login
              </button>
              <button
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                onClick={() => {
                  router.push('/auth/sign-up');
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Introducing PennyWise </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your finances with intelligent expense tracking and real-time insights
          </p>
          <div className="flex gap-4 justify-center">
            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all hover:shadow-lg"
              onClick={() => {
                router.push('/auth/sign-up');
              }}
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Stats Cards - Matching exact style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Smart Financial Management
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              PennyWise transforms the way you track and understand your spending habits. Our
              intuitive platform makes it effortless to log expenses, categorize transactions, and
              gain valuable insights into where your money goes. Whether you're saving for a goal or
              simply wanting to be more mindful of your spending, PennyWise provides the tools you
              need.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With custom categorization, smart budgeting recommendations, and detailed analytics,
              you'll always know exactly where you stand financially. Say goodbye to spreadsheets
              and hello to effortless financial clarity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered Insights</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our intelligent AI assistant is like having a personal financial advisor in your
              pocket. Ask questions about your spending patterns, get personalized budgeting advice,
              and receive proactive alerts when you're approaching your limits. The AI learns from
              your habits to provide increasingly accurate and helpful recommendations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From simple queries like "What did I spend on food this week?" to complex financial
              planning questions, our AI chatbot is ready to help 24/7. It's financial wisdom,
              personalized for you.
            </p>
          </div>
        </div>
      </section>

      {/* Current Features Section */}
      <section className="px-6 py-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Features</h2>
            <p className="text-gray-600">Everything you need to track and manage your finances</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-100">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                View your daily, weekly, and monthly spending at a glance. Track trends with
                beautiful charts and insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-100">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">All Transactions</h3>
              <p className="text-gray-600 leading-relaxed">
                Track and manage your financial activities with powerful filters, search, and
                categorization tools.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border border-green-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Chatbot</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant financial insights and personalized advice from your AI-powered
                financial assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Features</h2>
            <p className="text-gray-600">Exciting new capabilities coming soon to Penny Wise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                  COMING SOON
                </span> */}
              </div>
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Budget Goals</h3>
              <p className="text-gray-600 leading-relaxed">
                Set and track personalized budget goals. Get alerts when approaching limits and
                celebrate savings wins.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                  COMING SOON
                </span> */}
              </div>
              <div className="text-3xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Receipt Scanner</h3>
              <p className="text-gray-600 leading-relaxed">
                Snap photos of receipts for automatic expense extraction and categorization. No more
                manual entry.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                  COMING SOON
                </span> */}
              </div>
              <div className="text-3xl mb-4">🏦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bank Sync</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect your bank accounts for automatic transaction import. All your finances in
                one secure place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Preview - Matching chatbot sidebar style */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-gray-600">Get things done faster with one-click actions</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Check my recent transactions
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              What's my spending this month?
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Help me budget
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Add a new expense
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Show spending categories
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Financial tips
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-blue-600 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Your Financial Journey Today</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already building better financial habits
          </p>
          <div className="flex gap-4 justify-center">
            <button
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all hover:shadow-xl"
              onClick={() => {
                router.push('/auth/sign-up');
              }}
            >
              Create Free Account
            </button>
            <button
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              onClick={() => {
                router.push('/auth/login');
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <div className="text-xl font-semibold text-gray-900 mb-2">Penny Wise</div>
            <p className="text-sm">
              © {new Date().getFullYear()} Penny Wise. Track every penny, build your future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PennyWiseHomepage;
