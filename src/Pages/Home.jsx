import { useState, useEffect } from "react";
import InvoiceForm from "../features/invoices/InvoiceForm";
import InvoiceCard from "../components/InvoiceCard";

import { use } from "react";

export default function Home() {
    const [invoices, setInvoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [filter, setFilter] = useState("all");
    const [theme, setTheme] = useState("light");


    // Load from localStorage
    useEffect(() => {
    const data = localStorage.getItem("invoices");
        if (data) setInvoices(JSON.parse(data));
}, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);

    //Load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);
    
    // Apply theme and save
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, []);

    // Toggle function
    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    // Add or Update invoice
        function handlesave(invoice) {
            if (editingInvoice) {
                // Update
                setInvoices((prev) => 
                    prev.map((inv) => (inv.id ===
                    invoice.id ? invoice : inv))
                );
            setEditingInvoice(null);
            } else {
                // Create 
                setInvoices((prev) => [...prev, invoice]);
            }
        }

        // Delete
        function handleDelete(id) {
            const confirmDelete = confirm("Delete this invoice?");
            if (!confirmDelete) return;

            setInvoices((prev) => prev.filter((inv) =>
            inv.id !== id));
        }

        //Edit
        function handleEdit(invoice) {
            setEditingInvoice(invoice);
            setShowForm(true);
        }

        // Mark as Paid Logic 
        function handleMarkPaid(id){
            setInvoices((prev) => 
            prev.map((inv) =>
            inv.id === id ? { ...inv, status: "paid" } : inv)
        );
        }

        // Filter logic
        const filteredInvoices = filter === "all" ? invoices 
        : invoices.filter((inv) => inv.status === filter);
    
        return (
            <div className="home">
                {/* Header */}
                <div className="home-header">
                    <h1>Invoices</h1>
                    <div className="filter">
                        <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <button onClick={toggleTheme} className="btn-secondary">
                     {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>

                    <button 
                    className="btn-primary"
                    onClick={() => {
                        setShowForm(true);
                        setEditingInvoice(null);
                    }}
                    >
                        New Invoice
                    </button>
                </div>

                {/* Empty State */}
                {invoices.length === 0 ? (
                    <p>No invoices found</p>
                ) : (
                 <div className="invoice-list">
                    {filteredInvoices.map((inv) => (
                        <InvoiceCard
                        key={inv.id}
                        invoice={inv}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onMarkPaid={handleMarkPaid}
                        />
                    ))}
                    </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <InvoiceForm
                onclose={() => setShowForm(false)}
                onSave={handlesave}
                existingInvoice={editingInvoice}
                />
            )}
            </div>
    );
}
