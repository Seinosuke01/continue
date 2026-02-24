import { OnboardingModes } from "core/protocol/core";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "../../index";
import { useSubmitOnboarding } from "../hooks/useSubmitOnboarding";

interface OnboardingProvidersTabProps {
  isDialog?: boolean;
}

export function OnboardingProvidersTab({
  isDialog,
}: OnboardingProvidersTabProps) {
  const formMethods = useForm();
  const { submitOnboarding } = useSubmitOnboarding(
    OnboardingModes.API_KEY,
    isDialog,
  );

  const apiKey = formMethods.watch("airion_apiKey");

  const handleFormSubmit = () => {
    if (apiKey?.trim()) {
      submitOnboarding("airion", apiKey.trim());
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md">
        <FormProvider {...formMethods}>
          <div className="mt-5 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-foreground mb-1 flex items-center gap-3 text-sm font-medium">
                  Airion ラダー特化LLM APIキー
                </label>
                <Input
                  id="airion_apiKey"
                  type="password"
                  placeholder="Airion APIキーを入力してください"
                  className="w-full"
                  {...formMethods.register("airion_apiKey")}
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleFormSubmit}
              disabled={!apiKey?.trim()}
              className="w-full cursor-pointer hover:opacity-90"
            >
              接続する
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
