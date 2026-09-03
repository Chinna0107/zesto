import React, { useEffect, useState } from "react";
import { Download, TrendingUp, DollarSign, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export function AdminReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    fetch(`${BACKEND_URL}/admin/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        const orders = d.orders || [];
        const totalOrders = orders.length;
        const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total || 0), 0);
        setStats({ totalOrders, totalRevenue });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const convertToCSV = (data) => {
    if (!data || !data.length) return "";
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  const downloadReport = async (type) => {
    setExporting(type);
    const token = localStorage.getItem("token");
    let endpoint = "";
    
    if (type === 'revenue' || type === 'orders') endpoint = "/admin/orders";
    else if (type === 'products') endpoint = "/admin/products";
    else if (type === 'customers') endpoint = "/admin/users";
    else if (type === 'coupons') endpoint = "/admin/coupons";
    else {
      alert("Export type not supported.");
      setExporting(null);
      return;
    }

    try {
      const r = await fetch(`${BACKEND_URL}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json();
      
      let dataToExport = [];
      if (type === 'revenue' || type === 'orders') dataToExport = d.orders || [];
      else if (type === 'products') dataToExport = d.products || [];
      else if (type === 'customers') dataToExport = d.users || [];
      else if (type === 'coupons') dataToExport = d.coupons || [];

      // Clean up complex objects for CSV
      dataToExport = dataToExport.map(item => {
        const cleaned = { ...item };
        if (cleaned.address && typeof cleaned.address === 'object') cleaned.address = JSON.stringify(cleaned.address);
        if (cleaned.items && typeof cleaned.items === 'object') cleaned.items = JSON.stringify(cleaned.items);
        return cleaned;
      });

      if (dataToExport.length === 0) {
        alert("No data available to export.");
        setExporting(null);
        return;
      }

      const csvData = convertToCSV(dataToExport);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `${type}_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      alert("Failed to export data.");
    } finally {
      setExporting(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-orange-100 border-t-brand-orange rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-400 text-xs mt-0.5">Download data and view store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 border border-orange-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">₹{stats?.totalRevenue?.toLocaleString() || 0}</p>
            </div>
          </div>
          <button onClick={() => downloadReport('revenue')} disabled={exporting === 'revenue'} className="w-full mt-2 flex items-center justify-center gap-2 bg-brand-orange text-white py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50">
            {exporting === 'revenue' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Download className="w-4 h-4" />} Download Sales Report
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
            </div>
          </div>
          <button onClick={() => downloadReport('orders')} disabled={exporting === 'orders'} className="w-full mt-2 flex items-center justify-center gap-2 bg-brand-orange text-white py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50">
            {exporting === 'orders' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Download className="w-4 h-4" />} Download Orders Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><div className="w-2 h-5 bg-brand-orange rounded-full"></div>Export Data Center</h3>
        <div className="space-y-3">
          {[
            { title: "Products Inventory", desc: "Download full list of products, stock, and pricing", type: "products" },
            { title: "Customer Database", desc: "Download registered users and their details", type: "customers" },
            { title: "Coupon Usage", desc: "Download history of used discount codes", type: "coupons" }
          ].map((report, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-brand-orange/10 hover:bg-brand-orange/5 transition-colors group">
              <div>
                <p className="font-bold text-gray-900">{report.title}</p>
                <p className="text-xs text-gray-500">{report.desc}</p>
              </div>
              <button onClick={() => downloadReport(report.type)} disabled={exporting === report.type} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors disabled:opacity-50">
                {exporting === report.type ? <div className="w-4 h-4 border-2 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin"/> : <Download className="w-4 h-4" />} Export CSV
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

