
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        const result = login(formData.email, formData.password);

        setIsSubmitting(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        const destination = location.state?.from;
        const target = destination
            ? `${destination.pathname}${destination.search || ""}${destination.hash || ""}`
            : "/";

        navigate(target, { replace: true });
    };

    return (
        <main className="min-h-screen bg-[#f5f3ee] px-6 py-12 md:px-10 lg:px-16">
            <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[30px] bg-white lg:grid-cols-2">
                    <div className="hidden min-h-[650px] flex-col justify-between bg-[#171717] p-12 text-white lg:flex">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                                Welcome back
                            </p>

                            <h1 className="mt-6 max-w-md text-6xl font-semibold leading-[0.9] tracking-[-0.06em]">
                                Your style,
                                <span className="font-light italic"> your space.</span>
                            </h1>
                        </div>

                        <p className="max-w-sm text-sm leading-7 text-neutral-400">
                            Sign in to continue your VELŌRA experience and keep your
                            favorite pieces close.
                        </p>
                    </div>

                    <div className="flex min-h-[650px] flex-col justify-center p-7 sm:p-10 md:p-14">
                        <Link
                            to="/"
                            className="mb-10 flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-[#171717]"
                        >
                            <ArrowLeft size={15} />
                            Back to home
                        </Link>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                                Account
                            </p>

                            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#171717]">
                                Welcome back.
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-neutral-500">
                                Sign in to your account to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                            {error && (
                                <div
                                    role="alert"
                                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                                >
                                    {error}
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                                >
                                    Email
                                </label>

                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-2xl border border-black/10 bg-[#f5f3ee] px-4 py-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-[#171717]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="login-password"
                                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        autoComplete="current-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-2xl border border-black/10 bg-[#f5f3ee] px-4 py-4 pr-12 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-[#171717]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((current) => !current)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#171717]"
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Signing in..." : "Sign in"}
                                <ArrowUpRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:rotate-45"
                                />
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-neutral-500">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-[#171717] underline underline-offset-4"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
