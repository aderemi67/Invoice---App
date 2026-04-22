export default function FormInput({ label, value, onChange, error, name, type = "text" }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={error ? "error" : ""}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}