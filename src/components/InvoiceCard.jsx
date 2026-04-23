import StatusBadge from "./StatusBadge";
import "./index.css";


export default function InvoiceCard({ invoice, onEdit, onDelete, onMarkPaid }) {
    return (
        <div className="invoice-card">
            <div className="invoice-info">
                <h3>{invoice.clientName}</h3>
                <p>{invoice.clientEmail}</p>
                <p>${invoice.amount.toFixed(2)}</p>
                <StatusBadge status={invoice.status} />
            </div>

            <div className="card-actions">
                <button onClick={() => onEdit(invoice)}>Edit</button>
                <button onClick={() => onDelete(invoice.id)}>Delete</button>

                {invoice.status !== "paid" && invoice.status !== "draft" && (
                    <button onClick={() => onMarkPaid(invoice.id)}>
                        Mark as Paid
                    </button>
                )}
            </div>
        </div>
    );
}