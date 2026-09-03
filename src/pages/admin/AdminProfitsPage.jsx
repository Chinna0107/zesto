import React, { useState } from "react";
import { TrendingUp, Package, DollarSign, ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export function AdminProfitsPage() {
  // Static data for dropshipping profits
  const mockData = {
    "this_month": {
      totalRevenue: 125000, supplierCosts: 85000, shippingCosts: 12000, netProfit: 28000, itemsPurchased: 450, profitMargin: 22.4, monthlyGrowth: 15.2
    },
    "last_month": {
      totalRevenue: 108000, supplierCosts: 74000, shippingCosts: 10500, netProfit: 23500, itemsPurchased: 380, profitMargin: 21.7, monthlyGrowth: 4.5
    },
    "all_time": {
      totalRevenue: 1450000, supplierCosts: 980000, shippingCosts: 145000, netProfit: 325000, itemsPurchased: 4850, profitMargin: 22.4, monthlyGrowth: 0
    }
  };

  const [timeFilter, setTimeFilter] = useState("this_month");
  const stats = mockData[timeFilter];

  const recentTransactions = [
    { id: "TRX-1092", item: "Wireless Earbuds Pro", revenue: 2999, cost: 1200, profit: 1799, date: "2023-10-24" },
    { id: "TRX-1091", item: "Smart Watch Series 8", revenue: 4500, cost: 2800, profit: 1700, date: "2023-10-23" },
    { id: "TRX-1090", item: "Magnetic Phone Case", revenue: 899, cost: 200, profit: 699, date: "2023-10-23" },
    { id: "TRX-1089", item: "Laptop Stand Aluminum", revenue: 1200, cost: 500, profit: 700, date: "2023-10-22" },
    { id: "TRX-1088", item: "USB-C Hub 7-in-1", revenue: 1500, cost: 600, profit: 900, date: "2023-10-22" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dropshipping Profits</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor your margins, supplier costs, and net income.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          <button onClick={() => setTimeFilter("this_month")} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${timeFilter === "this_month" ? "bg-brand-orange text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>This Month</button>
          <button onClick={() => setTimeFilter("last_month")} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${timeFilter === "last_month" ? "bg-brand-orange text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>Last Month</button>
          <button onClick={() => setTimeFilter("all_time")} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${timeFilter === "all_time" ? "bg-brand-orange text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>All Time</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
          className="bg-white rounded-2xl p-5 border border-brand-orange/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-16 h-16 text-brand-orange" />
          </div>
          <p className="text-sm text-gray-500 font-semibold mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">₹{stats.totalRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-semibold bg-emerald-50 w-fit px-2 py-1 rounded-md">
            <ArrowUpRight className="w-3 h-3" /> +12.5%
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-brand-orange/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package className="w-16 h-16 text-gray-900" />
          </div>
          <p className="text-sm text-gray-500 font-semibold mb-1">Supplier + Shipping Costs</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">₹{(stats.supplierCosts + stats.shippingCosts).toLocaleString()}</p>
          <div className="flex items-center gap-1 text-red-500 text-xs font-semibold bg-red-50 w-fit px-2 py-1 rounded-md">
            <ArrowUpRight className="w-3 h-3" /> +5.2%
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-brand-orange rounded-2xl p-5 shadow-lg shadow-brand-orange/20 relative overflow-hidden group text-white">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
            <TrendingUp className="w-16 h-16" />
          </div>
          <p className="text-sm text-white/80 font-semibold mb-1">Net Profit</p>
          <p className="text-3xl font-bold mb-2">₹{stats.netProfit.toLocaleString()}</p>
          {timeFilter !== "all_time" && (
            <div className="flex items-center gap-1 text-white text-xs font-semibold bg-white/20 w-fit px-2 py-1 rounded-md backdrop-blur-sm">
              <ArrowUpRight className="w-3 h-3" /> +{stats.monthlyGrowth}%
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 border border-brand-orange/10 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-semibold mb-1">Items Purchased</p>
          <p className="text-3xl font-bold text-gray-900 mb-4">{stats.itemsPurchased}</p>
          
          <p className="text-sm text-gray-500 font-semibold mb-1">Profit Margin</p>
          <div className="flex items-center justify-between mb-1">
            <p className="text-lg font-bold text-brand-orange">{stats.profitMargin}%</p>
            <p className="text-xs text-gray-400">Target: 30%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-brand-orange h-1.5 rounded-full" style={{ width: `${stats.profitMargin}%` }}></div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profit Breakdown Chart Mockup */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="w-5 h-5 text-brand-orange" />
            <h3 className="font-bold text-gray-900">Cost Breakdown</h3>
          </div>
          
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Simple CSS Donut Chart representation */}
            <div className="absolute inset-0 rounded-full border-[16px] border-brand-orange"></div>
            <div className="absolute inset-0 rounded-full border-[16px] border-gray-900" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 80%)' }}></div>
            <div className="absolute inset-0 rounded-full border-[16px] border-gray-200" style={{ clipPath: 'polygon(50% 50%, 0 80%, 0 0, 50% 0)' }}></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">₹1.25L</span>
              <span className="text-xs text-gray-500">Revenue</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <span className="text-sm font-medium text-gray-600">Supplier Costs</span>
              </div>
              <span className="text-sm font-bold text-gray-900">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-sm font-medium text-gray-600">Shipping</span>
              </div>
              <span className="text-sm font-bold text-gray-900">9.6%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
                <span className="text-sm font-medium text-gray-600">Net Profit</span>
              </div>
              <span className="text-sm font-bold text-gray-900">22.4%</span>
            </div>
          </div>
        </div>

        {/* Recent Profitable Items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-0 lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Recent Transactions Breakdown</h3>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Transaction / Date</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                  <th className="px-6 py-4 text-right">Cost</th>
                  <th className="px-6 py-4 text-right text-brand-orange">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((trx, i) => (
                  <tr key={trx.id} className="hover:bg-brand-orange/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{trx.id}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{trx.date}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{trx.item}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">₹{trx.revenue}</td>
                    <td className="px-6 py-4 text-right text-gray-500">₹{trx.cost}</td>
                    <td className="px-6 py-4 text-right text-brand-orange font-bold bg-brand-orange/5 group-hover:bg-transparent transition-colors">
                      +₹{trx.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
