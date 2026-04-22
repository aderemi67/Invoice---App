import "./index.css";

export default function StatusBadge({ status }) {
    const statusMap = {
        pending: {
            label: "Pending",
            className: "status pending",
        },
        paid: {
            label: "Paid",
            className: "status paid",
        },
        draft: {
            label: "Draft",
            className: "status draft",
        },
    };

    const current = statusMap[status] || statusMap.pending;

    return (
        <span className={current.className}>
            <span className="status-dot"></span>
            {current.label}
        </span>
    );
}