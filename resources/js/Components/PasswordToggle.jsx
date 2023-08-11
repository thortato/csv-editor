export default function PasswordToggle({ className = '', ...props }) {
    const [data, setData] = useState({ password: '', remember: false });
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}