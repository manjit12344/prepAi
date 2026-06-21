import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userChat } from "../store/02.chat.store";
import { userAuth } from "../store/01.auth.store";

const STEPS = [
  {
    key: "type",
    label: "Job Role",
    placeholder: "Frontend Developer",
    description: "Enter the role you're preparing for.",
  },
  {
    key: "level",
    label: "Experience Level",
    placeholder: "Junior, Mid, Senior",
    description: "Choose your current experience level.",
  },
  {
    key: "company",
    label: "Target Company",
    placeholder: "Google, Stripe, Amazon...",
    description:
      "Optionally enter a company to tailor interview questions.",
  },
];

const CreateNew = () => {
  const { preInt, loading } = userChat();
  const { know, knowMe } = userAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    type: "",
    level: "",
    company: "",
  });

  useEffect(() => {
    knowMe();
  }, []);

  const current = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [current.key]: e.target.value,
    }));

    if (error) setError("");
  };

  const goNext = async () => {
    if (!form[current.key].trim()) {
      setError("This field is required.");
      return;
    }

    if (!isLastStep) {
      setStep((prev) => prev + 1);
      return;
    }

    try {
      const data = await preInt(
        form.type,
        form.level,
        form.company
      );

      navigate(`/chatSession/${data.response.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create interview session. Please try again.");
    }
  };

  const goBack = () => {
    if (step === 0) return;

    setError("");
    setStep((prev) => prev - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goNext();
    }
  };

  if (!know?.user) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-canvas flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-xl border border-line bg-card p-6 text-center">
          <h2 className="text-lg font-semibold text-main mb-2">
            Login Required
          </h2>

          <p className="text-sm text-muted">
            Please log in to create a new interview session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-canvas text-main flex flex-col lg:flex-row border-t border-line">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-[340px] xl:w-[400px] border-b lg:border-b-0 lg:border-r border-line bg-card/20 p-5 lg:p-8">
        
        <div className="text-xs uppercase tracking-wider text-muted mb-4">
          Interview Setup
        </div>

        <h1 className="text-2xl font-semibold leading-tight mb-8">
          Let's create your interview session.
        </h1>

        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2">
          {STEPS.map((item, index) => {
            const active = index === step;
            const completed = index < step;

            return (
              <div
                key={item.key}
                className="flex items-start gap-3 min-w-[160px] lg:min-w-0"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium border ${
                    active
                      ? "border-main text-main"
                      : completed
                      ? "border-emerald-500 text-emerald-500"
                      : "border-line text-muted"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <div>
                  <p
                    className={`text-sm ${
                      active ? "text-main font-medium" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </p>

                  {completed && (
                    <p className="text-xs text-muted mt-1 truncate max-w-[140px]">
                      {form[item.key]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        
        <div className="w-full max-w-xl bg-card border border-line rounded-2xl overflow-hidden shadow-sm">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-line bg-canvas">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">
                Step {step + 1} of {STEPS.length}
              </span>

              <span className="text-xs text-muted">
                {Math.round(
                  ((step + 1) / STEPS.length) * 100
                )}
                %
              </span>
            </div>

            <div className="mt-3 h-2 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-main transition-all duration-300"
                style={{
                  width: `${((step + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="p-5 md:p-8">
            
            <h2 className="text-xl font-semibold mb-2">
              {current.label}
            </h2>

            <p className="text-sm text-muted mb-6">
              {current.description}
            </p>

            <input
              type="text"
              value={form[current.key]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={current.placeholder}
              autoFocus
              disabled={loading}
              className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm outline-none transition focus:border-main disabled:opacity-50"
            />

            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Preview (Desktop Only) */}
            <div className="hidden md:block mt-8 rounded-lg border border-line bg-canvas/40 p-4">
              <div className="text-xs text-muted mb-2">
                Session Preview
              </div>

              <pre className="text-xs text-muted overflow-auto">
                {JSON.stringify(form, null, 2)}
              </pre>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between gap-3">
              
              <button
                onClick={goBack}
                disabled={step === 0 || loading}
                className="px-4 py-2 rounded-lg border border-line text-sm hover:bg-card disabled:opacity-40"
              >
                Back
              </button>

              <button
                onClick={goNext}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-main text-canvas text-sm font-medium hover:opacity-90 disabled:opacity-40"
              >
                {loading
                  ? "Creating..."
                  : isLastStep
                  ? "Start Interview"
                  : "Continue"}
              </button>

            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default CreateNew;