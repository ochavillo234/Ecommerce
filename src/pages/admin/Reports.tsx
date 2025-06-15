import { useState } from "react"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Download, RefreshCw } from "lucide-react"


// Dummy report data
const salesData = [
  { month: "Jan", revenue: 12500, orders: 45, customers: 32 },
  { month: "Feb", revenue: 15200, orders: 52, customers: 38 },
  { month: "Mar", revenue: 18900, orders: 67, customers: 45 },
  { month: "Apr", revenue: 22100, orders: 78, customers: 52 },
  { month: "May", revenue: 19800, orders: 71, customers: 48 },
  { month: "Jun", revenue: 25600, orders: 89, customers: 61 },
]

const topProducts = [
  { id: "1", name: "Daily Comfort Hanbok", sales: 156, revenue: 14040.44, category: "Casual" },
  { id: "6", name: "Royal Wedding Hanbok", sales: 89, revenue: 26699.11, category: "Wedding" },
  { id: "16", name: "Contemporary Fusion Hanbok", sales: 78, revenue: 9827.22, category: "Modern" },
  { id: "21", name: "Traditional Hair Pin Set", sales: 234, revenue: 6081.66, category: "Accessories" },
  { id: "11", name: "Little Princess Hanbok", sales: 67, revenue: 3080.33, category: "Children" },
]



const orderMetrics = [
  { metric: "Total Orders", value: 2456, change: 15.7, trend: "up" },
  { metric: "Pending Orders", value: 23, change: -12.3, trend: "down" },
  { metric: "Completed Orders", value: 2398, change: 16.2, trend: "up" },
  { metric: "Cancelled Orders", value: 35, change: -8.9, trend: "down" },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedReport, setSelectedReport] = useState("overview")

  const totalRevenue = salesData.reduce((sum, month) => sum + month.revenue, 0)
  const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0)
  const totalCustomers = salesData.reduce((sum, month) => sum + month.customers, 0)
  const avgOrderValue = totalRevenue / totalOrders

  const currentMonth = salesData[salesData.length - 1]
  const previousMonth = salesData[salesData.length - 2]
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="h-5 w-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Report Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedReport("overview")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedReport === "overview" ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedReport("sales")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedReport === "sales" ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Sales
            </button>

            <button
              onClick={() => setSelectedReport("products")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedReport === "products" ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Products
            </button>
          </div>
        </div>

        {/* Overview Report */}
        {selectedReport === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{revenueGrowth.toFixed(1)}%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-blue-600">+15.7%</span>
                    </div>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm text-purple-600">+12.5%</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600">-2.3%</span>
                    </div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Trend</h2>
              <div className="h-64 flex items-end justify-between space-x-2">
                {salesData.map((month) => (
                  <div key={month.month} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg w-full transition-all duration-300 hover:from-pink-700 hover:to-pink-500"
                      style={{
                        height: `${(month.revenue / Math.max(...salesData.map((m) => m.revenue))) * 200}px`,
                        minHeight: "20px",
                      }}
                    ></div>
                    <p className="text-sm text-gray-600 mt-2">{month.month}</p>
                    <p className="text-xs text-gray-500">${month.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Top Selling Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Sales</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-2">#{index + 1}</span>
                            <span className="text-sm text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{product.sales}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">${product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sales Report */}
        {selectedReport === "sales" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {orderMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.metric.includes("Rate") ? `${metric.value}%` : metric.value.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}%
                        </span>
                      </div>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Sales Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Sales Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Month</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Orders</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Avg Order Value</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((month, index) => {
                      const prevMonth = index > 0 ? salesData[index - 1] : null
                      const growth = prevMonth ? ((month.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0

                      return (
                        <tr key={month.month} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">${month.revenue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{month.orders}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            ${(month.revenue / month.orders).toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {index > 0 && (
                              <span className={`${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {growth >= 0 ? "+" : ""}
                                {growth.toFixed(1)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}



        {/* Product Report */}
        {selectedReport === "products" && (
          <div className="space-y-8">
            {/* Product Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Product Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Rank</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Units Sold</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Avg Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                index === 0
                                  ? "bg-yellow-500"
                                  : index === 1
                                    ? "bg-gray-400"
                                    : index === 2
                                      ? "bg-orange-500"
                                      : "bg-gray-300"
                              }`}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{product.sales}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">${product.revenue.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          ${(product.revenue / product.sales).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Category Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Casual", "Wedding", "Modern", "Children", "Accessories"].map((category) => {
                  const categoryProducts = topProducts.filter((p) => p.category === category)
                  const categoryRevenue = categoryProducts.reduce((sum, p) => sum + p.revenue, 0)
                  const categorySales = categoryProducts.reduce((sum, p) => sum + p.sales, 0)

                  return (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Revenue:</span>
                          <span className="text-sm font-medium">${categoryRevenue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Units Sold:</span>
                          <span className="text-sm font-medium">{categorySales}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Avg Price:</span>
                          <span className="text-sm font-medium">
                            ${categorySales > 0 ? (categoryRevenue / categorySales).toFixed(2) : "0.00"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
