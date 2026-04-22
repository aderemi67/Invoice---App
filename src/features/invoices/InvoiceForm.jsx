import { useState, useEffect } from "react";

const initialState = {
    clientName: "",
    clientEmail: "",
    amount: "",
    status: "pending",
    dueDate: "",
}

export default function InvoiceForm({ onClose, onSave, existingInvoice }) {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    // pre-fill when editing
    useEffect(() => {
        if (existingInvoice) {
            setForm(existingInvoice);
        } else {
            setForm(initialState);
        }

    }, [existingInvoice]);

    // validation
    function validate() {
        const newErrors = {};
        if (!form.clientName.trim()) {
            newErrors.clientName = "Client name is required";
        } else if (!/^[^s@]+@\s@+\.[^\S@]+$/.test(form.clientEmail)) {
            newErrors.clientEmail = "Invalid client email";
        }
        
        if (!form.amount || Number(form.amount) <= 0) {
            newErrors.amount = "Enter a valid amount";
        }
        if (!form.dueDate) {
            newErrors.dueDate = "Due date is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    // Submit
    function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        const invoiceData = {
            ...form,
            amount: Number(form.amount),
            id:existingInvoice?.id || Date.now(),
            createdAt: existingInvoice?.createdAt || new Date().toISOString(),

        };

        onSave(invoiceData);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <form className="form"
            onSubmit={handleSubmit}>
                <h2>{existingInvoice ? "Edit Invoice" : "Create Invoice"}</h2>

                {/* Client Name */}
                <div className="form-group">
                    <label>Client Name</label>
                    <input
                        type="text"
                        value={form.clientName}
                        onChange={handleChange}
                        className={errors.clientName ? "error" : ""}
                    />
                    {errors.clientName && (
                    <p className="error-text">{errors.clientName}</p>
                    )}
                     
                </div>

                {/* Email */}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={form.clientEmail}
                        onChange={handleChange}
                        className={errors.clientEmail ? "error" : ""}
                    />
                    {errors.clientEmail && (
                        <p className="error-text">{errors.clientEmail}</p>
                    )}
                </div>

                {/* Amount */}
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className={errors.amount ? "error" : ""}
                    />
                    {errors.amount && (
                        <p className="error-text">{errors.amount}</p>
                    )}
                </div>

                {/* Due Date */}
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        className={errors.dueDate ? "error" : ""}
                    />
                    {errors.dueDate && (
                        <p className="error-text">{errors.dueDate}</p>
                    )}
                </div>

                {/* Status */}
                <div className="form-status">
                    <label>Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className={errors.status ? "error" : ""}
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="draft">Draft</option>
                    </select>
                    
                </div>

                {/* Actions */}
                <div className="form-actions">
                    <button
                    type="button"
                    onClick={onClose}
                    >
                        Cancel
                    </button>
                

                <button type="submit" className="btn btn-primary">
                    {existingInvoice ? "Update" : "Save"}
                </button>
                </div>
            </form>
        </div>
    );
}