"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"overview" | "moderation" | "analytics">("overview");

  // Mock data
  const stats = {
    totalReviews: 1247,
    flaggedContent: 89,
    approvedContent: 1158,
    avgResponseTime: "2.3m",
    accuracyRate: 94.5,
    activeUsers: 156,
  };

  const recentContent = [
    {
      id: 1,
      user: "user_2847",
      content: "Great product! Highly recommend it to everyone.",
      sentiment: "positive",
      status: "approved",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      user: "user_1923",
      content: "This is spam content with suspicious links...",
      sentiment: "negative",
      status: "flagged",
      timestamp: "5 minutes ago",
    },
    {
      id: 3,
      user: "user_3456",
      content: "Average experience, nothing special.",
      sentiment: "neutral",
      status: "pending",
      timestamp: "8 minutes ago",
    },
    {
      id: 4,
      user: "user_7821",
      content: "Excellent customer service and fast delivery!",
      sentiment: "positive",
      status: "approved",
      timestamp: "12 minutes ago",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Content Guardian</h1>
                <p className="text-xs text-gray-400">AI-Powered Moderation</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                Settings
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Reviews */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">
              {stats.totalReviews.toLocaleString()}
            </h3>
            <p className="text-gray-400 text-sm">Total Reviews</p>
          </div>

          {/* Flagged Content */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="text-xs text-red-400">89</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.flaggedContent}</h3>
            <p className="text-gray-400 text-sm">Flagged Content</p>
          </div>

          {/* Accuracy Rate */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xs text-green-400">High</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.accuracyRate}%</h3>
            <p className="text-gray-400 text-sm">Accuracy Rate</p>
          </div>

          {/* Active Users */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.activeUsers}</h3>
            <p className="text-gray-400 text-sm">Active Users</p>
          </div>

          {/* Response Time */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.avgResponseTime}</h3>
            <p className="text-gray-400 text-sm">Avg Response Time</p>
          </div>

          {/* Activity Status */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">Live</h3>
            <p className="text-gray-400 text-sm">System Status</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("moderation")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "moderation"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Moderation Queue
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          {activeTab === "overview" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                    Search
                  </button>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recentContent.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {item.user.slice(5, 7)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.user}</p>
                          <p className="text-gray-400 text-xs">{item.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : item.status === "flagged"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.sentiment === "positive"
                              ? "bg-blue-500/20 text-blue-400"
                              : item.sentiment === "negative"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{item.content}</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-md text-sm transition-colors">
                        ✓ Approve
                      </button>
                      <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md text-sm transition-colors">
                        ✗ Reject
                      </button>
                      <button className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-md text-sm transition-colors">
                        ⚑ Flag
                      </button>
                      <button className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-md text-sm transition-colors">
                        ⦿ Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "moderation" && (
            <div className="text-center py-12">
              <div className="p-4 bg-purple-500/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Moderation Queue</h3>
              <p className="text-gray-400 mb-6">
                Advanced moderation tools and workflow management
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-4xl mb-2">⏳</div>
                  <p className="text-white font-semibold">12 Pending</p>
                  <p className="text-gray-400 text-xs">Awaiting Review</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-4xl mb-2">✓</div>
                  <p className="text-white font-semibold">1158 Approved</p>
                  <p className="text-gray-400 text-xs">All Time</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="text-center py-12">
              <div className="p-4 bg-blue-500/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 mb-6">
                Comprehensive insights and performance metrics
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-white font-semibold">+24%</p>
                  <p className="text-gray-400 text-xs">Growth Rate</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-white font-semibold">94.5%</p>
                  <p className="text-gray-400 text-xs">Accuracy</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-4xl mb-2">⏱️</div>
                  <p className="text-white font-semibold">2.3m</p>
                  <p className="text-gray-400 text-xs">Avg Response</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Content Guardian v1.0.0 | AI-Powered Content Moderation Platform
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Built with Next.js 14 & TypeScript | © 2024 Karl Camaro Dev
          </p>
        </div>
      </div>
    </main>
  );
}