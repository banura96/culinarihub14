export default function Input({label, id, classN = null, hiddenElement = false, required = true,  ...props}) {
    const classForP = (classN && classN + ' control') || 'control' 
    return <p className={classForP} hidden={hiddenElement}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required={required} {...props} />
    </p>
}