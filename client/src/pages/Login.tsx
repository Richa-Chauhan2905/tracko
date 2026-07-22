import GoogleLoginButton from "../auth/GoogleLoginButton";
import { MapPin } from "lucide-react";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <MapPin size={32} />
          </div>
          <h1 className="login-title">Tracko</h1>
          <p className="login-subtitle">Real‑time driver tracking</p>
        </div>

        <div className="login-divider">
          <span>Sign in to continue</span>
        </div>

        <div className="login-button-wrapper">
          <GoogleLoginButton />
        </div>

        <p className="login-footer">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          padding: 1rem;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }

        .login-card {
          max-width: 28rem;
          width: 100%;
          background: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          padding: 2rem 1.5rem 1.5rem;
        }

        .login-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .login-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          background: #dbeafe;
          border-radius: 9999px;
          color: #2563eb;
          margin-bottom: 0.75rem;
        }

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          color: #0f172a;
        }

        .login-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .login-divider {
          position: relative;
          margin: 1.5rem 0;
          text-align: center;
        }
        .login-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: #e2e8f0;
        }
        .login-divider span {
          position: relative;
          background: #ffffff;
          padding: 0 0.75rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        .login-button-wrapper {
          display: flex;
          justify-content: center;
          margin: 1rem 0 1.5rem;
        }

        .login-footer {
          font-size: 0.75rem;
          text-align: center;
          color: #94a3b8;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
