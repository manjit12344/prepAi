import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userChat } from "../store/02.chat.store";
import { userAuth } from "../store/01.auth.store";
import { STEPS } from "../components/createNew/createInterview.js";
import { useCreateInterviewForm } from "../components/createNew/useCreateInterviewForm";
import LoginRequiredNotice from "../components/createNew/LoginRequiredNotice";
import StepProgress from "../components/createNew/StepProgress";
import StepField from "../components/createNew/StepField";
import FormDebugPreview from "../components/createNew/FormDebugPreview";
import StepNavigation from "../components/createNew/StepNavigation";

const CreateNew = () => {
  const { preInt, loading } = userChat();
  const { know, knowMe } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    knowMe();
  }, []);

  const handleSubmit = async (form, setError) => {
    try {
      const data = await preInt(form.type, form.level, form.company);
      navigate(`/chatSession/${data.response.id}`);
    } catch (err) {
      console.log(err);
      setError("Failed to create interview.");
    }
  };

  const {
    step,
    current,
    isLastStep,
    form,
    error,
    handleChange,
    goNext,
    goBack,
    handleKeyDown,
  } = useCreateInterviewForm(STEPS, handleSubmit);

  if (!know?.user) {
    return <LoginRequiredNotice />;
  }

  return (
    <div>
      <h1>Create Interview</h1>

      <StepProgress step={step} total={STEPS.length} />

      <StepField
        current={current}
        value={form[current.key]}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        error={error}
        disabled={loading}
      />

      <FormDebugPreview form={form} />

      <StepNavigation
        step={step}
        isLastStep={isLastStep}
        loading={loading}
        onBack={goBack}
        onNext={goNext}
      />
    </div>
  );
};

export default CreateNew;
