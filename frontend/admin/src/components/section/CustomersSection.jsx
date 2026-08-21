// CustomersSection.jsx
import { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Calendar,
  SlidersHorizontal,
  Download,
  RefreshCw,
  UserPlus,
  Eye,
  Ban,
  CheckCircle2,
} from "lucide-react";
import TopBar from "./TopBar";
import { getCustomers } from "../../api/auth";

// dummy data ya muda -- baadaye itatolewa kwenye database
// const initialCustomers = [
//   { id: 1, name: "Amina Hassan", email: "amina@example.com", phone: "+255 712 345 678", plan: "Pro plan", status: "Active", joined: "Aug 7, 2026" },
//   { id: 2, name: "John Mrema", email: "john@example.com", phone: "+255 713 221 004", plan: "Starter plan", status: "Active", joined: "Aug 6, 2026" },
//   { id: 3, name: "Grace Kileo", email: "grace@example.com", phone: "+255 754 890 213", plan: "Business plan", status: "Suspended", joined: "Aug 5, 2026" },
//   { id: 4, name: "Peter Shayo", email: "peter@example.com", phone: "+255 621 004 552", plan: "Starter plan", status: "Active", joined: "Aug 3, 2026" },
// ]

const statusStyles = {
  Active: "bg-green-50 text-green-600",
  Suspended: "bg-red-50 text-red-600",
  Pending: "bg-amber-50 text-amber-600",
};

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function CustomersSection() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await getCustomers();

        console.log("CUSTOMERS RESPONSE:", response);

        const formattedCustomers = response.data.map((customer) => ({
          id: customer.id,

          name:
            `${customer.firstname || ""} ${customer.lastname || ""}`.trim() ||
            "Unknown",

          email: customer.email || "—",

          phone: customer.phonenumber || "—",

          country: customer.country || "—",

          status: customer.is_active ? "Active" : "Suspended",

          joined: customer.date_joined
            ? new Date(customer.date_joined).toLocaleDateString()
            : "—",
        }));

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error(
          "Failed to load customers",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  });

  const toggleAll = (e) => {
    setSelected(e.target.checked ? filteredCustomers.map((c) => c.id) : []);
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleView = (customer) => {
    // TODO: fungua modal/navigate kwenye profile ya mteja
    console.log("View customer:", customer);
  };

  const handleToggleBan = (customer) => {
    // TODO: unganisha na API endpoint ya kweli kubadilisha status
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, status: c.status === "Suspended" ? "Active" : "Suspended" }
          : c,
      ),
    );
  };

  return (
    <div className="bg-slate-50 h-full overflow-y-auto flex flex-col">
      <TopBar pageTitle="Customers" />

      {/* CONTENT */}
      <div className="p-4 sm:p-6">
        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            All statuses
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <button className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            Plan
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-[160px] border border-slate-200 rounded-lg px-3 py-2 bg-white">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
            />
          </div>

          <button className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Calendar size={14} />
            Date range
          </button>

          <button className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <SlidersHorizontal size={14} />
            View
          </button>

          <button className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Download size={14} />
            Export
          </button>

          <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50 transition-colors">
            <RefreshCw size={14} />
          </button>

          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-3.5 py-2 text-sm transition-colors">
            <UserPlus size={14} />
            New customer
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/60">
                  <th className="w-10 px-4 py-3 border-b border-slate-200">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === filteredCustomers.length &&
                        filteredCustomers.length > 0
                      }
                      onChange={toggleAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Email
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Plan
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Joined
                  </th>
                  <th className="text-right text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center text-slate-400 text-sm py-16"
                    >
                      Loading customers...
                    </td>
                  </tr>
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c) => (
                    <tr key={c.id} className="group">
                      <td className="px-4 py-3 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={selected.includes(c.id)}
                          onChange={() => toggleOne(c.id)}
                          className="rounded border-slate-300"
                        />
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-2.5 whitespace-nowrap">
                          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
                            {initials(c.name)}
                          </div>

                          <span className="text-slate-900 font-medium">
                            {c.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 text-slate-500 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.email}
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 text-slate-500 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.phone}
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 text-slate-700 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.plan || "Not set"}
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                            statusStyles[c.status]
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 text-slate-400 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.joined}
                      </td>

                      <td className="px-4 py-3 border-b border-slate-100 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleView(c)}
                            title="View customer"
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                          >
                            <Eye size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleBan(c)}
                            title={
                              c.status === "Suspended"
                                ? "Unban customer"
                                : "Ban customer"
                            }
                            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors ${
                              c.status === "Suspended"
                                ? "border-green-200 text-green-600 hover:bg-green-50"
                                : "border-red-200 text-red-500 hover:bg-red-50"
                            }`}
                          >
                            {c.status === "Suspended" ? (
                              <CheckCircle2 size={13} />
                            ) : (
                              <Ban size={13} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center text-slate-400 text-sm py-16"
                    >
                      {searchTerm
                        ? `No customers found for "${searchTerm}".`
                        : "No customers yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomersSection;
