// DashboardSection.jsx
import {
  Wallet,
  Users,
  CreditCard,
  UserCog,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  AudioLines,
  UserCheck,
  XCircle,
  UserX,
} from "lucide-react"
import TopBar from "./TopBar"

const stats = [
  { label: "Total income", value: "TZS 12.4M", change: "+8.2%", trend: "up", icon: Wallet },
  { label: "Total customers", value: "1,284", change: "+4.6%", trend: "up", icon: Users },
  { label: "Total subscriptions", value: "312", change: "-1.3%", trend: "down", icon: CreditCard },
  { label: "Total staff", value: "18", change: "+2", trend: "up", icon: UserCog },
  { label: "Total audio generated", value: "4,932", change: "+12.5%", trend: "up", icon: AudioLines },
  { label: "Active customers", value: "1,096", change: "+3.1%", trend: "up", icon: UserCheck },
  { label: "Failed subscriptions", value: "24", change: "+5.4%", trend: "down", icon: XCircle },
  { label: "Inactive customers", value: "188", change: "-2.2%", trend: "up", icon: UserX },
]

const recentTransactions = [
  { id: 1, name: "Yusto Mwakifwamba", plan: "Pro plan", amount: "TZS 45,000", status: "Success", date: "Aug 7" },
  { id: 2, name: "Amina Hassan", plan: "Starter plan", amount: "TZS 15,000", status: "Success", date: "Aug 7" },
  { id: 3, name: "John Mrema", plan: "Pro plan", amount: "TZS 45,000", status: "Pending", date: "Aug 6" },
  { id: 4, name: "Grace Kileo", plan: "Business plan", amount: "TZS 120,000", status: "Failed", date: "Aug 6" },
  { id: 5, name: "Peter Shayo", plan: "Starter plan", amount: "TZS 15,000", status: "Success", date: "Aug 5" },
]

const recentCustomers = [
  { id: 1, name: "Amina Hassan", email: "amina@example.com", joined: "Aug 7" },
  { id: 2, name: "John Mrema", email: "john@example.com", joined: "Aug 6" },
  { id: 3, name: "Grace Kileo", email: "grace@example.com", joined: "Aug 5" },
]

const statusStyles = {
  Success: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-red-50 text-red-600",
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2)
}

function DashboardSection() {
  return (
    <div className="bg-slate-50 h-full overflow-y-auto flex flex-col">

      <TopBar pageTitle="Overview" />

      <div className="p-4 sm:p-6 flex flex-col gap-5">

        {/* STAT CARDS - rows mbili za 4-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {stats.map(({ label, value, change, trend, icon: Icon }) => (
            <div
              key={label}
              className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-slate-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-slate-900 text-base font-semibold truncate">{value}</p>
                <p className="text-slate-400 text-xs truncate">{label}</p>
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium flex-shrink-0 ${trend === "up" ? "text-green-600" : "text-red-500"}`}>
                {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">

          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-5">
              <p className="text-slate-900 font-medium text-sm">Revenue overview</p>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="h-44 flex items-end gap-2">
              {[40, 65, 50, 80, 60, 90, 70, 55, 85, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-slate-100 hover:bg-blue-500 rounded-t transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
            <p className="text-slate-900 font-medium text-sm mb-4">Recent customers</p>
            <div className="flex flex-col gap-3">
              {recentCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {initials(customer.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-900 text-sm font-medium truncate">{customer.name}</p>
                    <p className="text-slate-400 text-xs truncate">{customer.email}</p>
                  </div>
                  <span className="text-slate-400 text-xs flex-shrink-0">{customer.joined}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-200">
            <p className="text-slate-900 font-medium text-sm">Recent transactions</p>
            <button className="text-blue-600 text-xs font-medium hover:underline">View all</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left text-slate-400 text-xs font-medium px-4 sm:px-5 py-2.5">Customer</th>
                  <th className="text-left text-slate-400 text-xs font-medium px-4 py-2.5">Plan</th>
                  <th className="text-left text-slate-400 text-xs font-medium px-4 py-2.5">Amount</th>
                  <th className="text-left text-slate-400 text-xs font-medium px-4 py-2.5">Status</th>
                  <th className="text-right text-slate-400 text-xs font-medium px-4 sm:px-5 py-2.5">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="group">
                    <td className="px-4 sm:px-5 py-3 border-t border-slate-100 group-hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center text-[11px] font-medium flex-shrink-0">
                          {initials(tx.name)}
                        </div>
                        <span className="text-slate-900 font-medium">{tx.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-t border-slate-100 text-slate-500 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      {tx.plan}
                    </td>
                    <td className="px-4 py-3 border-t border-slate-100 text-slate-900 font-medium whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      {tx.amount}
                    </td>
                    <td className="px-4 py-3 border-t border-slate-100 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${statusStyles[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 border-t border-slate-100 text-slate-400 text-right whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardSection