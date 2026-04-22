export default function FormSelect({ label, value, onChange, options }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}