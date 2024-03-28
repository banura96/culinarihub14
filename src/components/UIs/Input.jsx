export default function Input({label,id, hiddenElement = false, required = true,  ...props}) {
    return <p className="control" hidden={hiddenElement}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required={required} {...props} />
    </p>
}