import { useState, useEffect } from "react";
//import InvoiceForm from "../features/invoices/InvoiceForm";
import { use } from "react";

export default function Home() {
    const [invoices, setInvoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);


    // Load from localStorage
    useEffect(() => {
    const data = localStorage.getItem("invoices");
        if (data) setInvoices(JSON.parse(data));
}, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);

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
    
        return (
            <div className="home">
                {/* Header */}
                <div className="home-header">
                    <h1>Invoices</h1>

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
                        {invoices.map((inv) => (
                            <div key={inv.id}
                            className="invoice-card">
                                <h3>{inv.clientName}</h3>
                                <p>{inv.clientEmail}</p>
                                <p>${inv.amount}</p>
                                <p>Status:{inv.status}</p>

                                <div className="card-actions">
                                    <button onClick={() => handleEdit(inv)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(inv.id)}>
                                        Delete
                                    </button>
                                </div>
                                </div>
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
