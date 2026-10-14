
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowUpRight,
    Eye,
    EyeOff,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (error) setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (!acceptedTerms) {
            setError("Please accept the Terms & Conditions to continue.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = register({
            name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            email: formData.email.trim(),
            password: formData.password,
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/", { replace: true });
    };

    const inputClass =
        "h-[52px] w-full rounded-2xl border border-black/10 bg-[#f8f7f4] px-4 text-sm text-[#171717] outline-none transition-all placeholder:text-neutral-400 focus:border-[#171717] focus:bg-white";

    const labelClass =
        "mb-2 block text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500";

    return (
        <main className="min-h-screen bg-[#f5f3ee] px-6 py-8 md:px-10 lg:px-16">
            <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col">
                <Link
                    to="/"
                    className="flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#171717]"
                >
                    <ArrowLeft size={15} />
                    Back to home
                </Link>

                <div className="flex flex-1 items-center justify-center py-12">
                    <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:grid-cols-2">
                        <div className="flex items-center justify-center px-7 py-12 sm:px-12 lg:px-16">
                            <div className="w-full max-w-md">
                                <div className="mb-9">
                                    <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-400">
                                        Join the collection
                                    </p>

                                    <h1 className="text-5xl font-semibold tracking-[-0.06em] text-[#171717] md:text-6xl">
                                        Create
                                        <span className="font-light italic"> account.</span>
                                    </h1>

                                    <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-500">
                                        Create your account and discover pieces designed for
                                        everyday living.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {error && (
                                        <div
                                            role="alert"
                                            className="rounded-2xl bg-red-50 px-4 py-3 text-xs text-red-600"
                                        >
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="firstName" className={labelClass}>
                                                First name
                                            </label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                autoComplete="given-name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="First name"
                                                required
                                                className={inputClass}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="lastName" className={labelClass}>
                                                Last name
                                            </label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                autoComplete="family-name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Last name"
                                                required
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="register-email" className={labelClass}>
                                            Email address
                                        </label>
                                        <input
                                            id="register-email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="register-password" className={labelClass}>
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="register-password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Create a password"
                                                minLength={6}
                                                required
                                                className={`${inputClass} pr-12`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((current) => !current)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-[#171717]"
                                            >
                                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className={labelClass}
                                        >
                                            Confirm password
                                        </label>

                                        <div className="relative">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Repeat your password"
                                                minLength={6}
                                                required
                                                className={`${inputClass} pr-12`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword((current) => !current)
                                                }
                                                aria-label={
                                                    showConfirmPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-[#171717]"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={17} />
                                                ) : (
                                                    <Eye size={17} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 pt-1">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            checked={acceptedTerms}
                                            onChange={(event) =>
                                                setAcceptedTerms(event.target.checked)
                                            }
                                            required
                                            className="mt-0.5 h-4 w-4 cursor-pointer accent-[#171717]"
                                        />

                                        <label
                                            htmlFor="terms"
                                            className="text-xs leading-5 text-neutral-500"
                                        >
                                            I agree to the{" "}
                                            <span className="font-medium text-[#171717]">
                                                Terms & Conditions
                                            </span>{" "}
                                            and Privacy Policy.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="group flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                                    >
                                        Create Account
                                        <ArrowUpRight
                                            size={17}
                                            className="transition-transform duration-300 group-hover:rotate-45"
                                        />
                                    </button>
                                </form>

                                <div className="mt-8 border-t border-black/10 pt-6">
                                    <p className="text-center text-sm text-neutral-500">
                                        Already have an account?
                                        <Link
                                            to="/login"
                                            className="ml-2 font-medium text-[#171717] underline underline-offset-4 transition-opacity hover:opacity-60"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden min-h-[700px] overflow-hidden bg-[#ded8cd] lg:block">
                            <img
                                src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90"
                                alt="Fashion collection"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/20" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="rounded-[24px] bg-white/90 p-6 backdrop-blur-md">
                                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-400">
                                        Your everyday edit
                                    </p>

                                    <p className="mt-3 max-w-sm text-2xl font-medium leading-tight tracking-[-0.04em] text-[#171717]">
                                        Find pieces that feel
                                        <span className="font-light italic"> like you.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
