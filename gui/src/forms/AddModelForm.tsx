import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "../components";
import { IdeMessengerContext } from "../context/IdeMessenger";
import { useAppDispatch } from "../redux/hooks";
import { useAuth } from "../context/Auth";
import { updateSelectedModelByRole } from "../redux/thunks/updateSelectedModelByRole";

const AIRION_LLM_API_BASE = "https://api.airion.com/v1";
const AIRION_LLM_MODEL = "airion-ladder-llm";
const AIRION_LLM_TITLE = "Airion ラダー特化LLM";

interface AddModelFormProps {
  onDone: () => void;
  hideFreeTrialLimitMessage?: boolean;
}

export function AddModelForm({ onDone }: AddModelFormProps) {
  const formMethods = useForm();
  const ideMessenger = useContext(IdeMessengerContext);
  const dispatch = useAppDispatch();
  const { selectedProfile } = useAuth();

  const apiKey = formMethods.watch("apiKey");

  function onSubmit() {
    const model = {
      provider: "openai",
      underlyingProviderName: "openai",
      title: AIRION_LLM_TITLE,
      model: AIRION_LLM_MODEL,
      apiBase: AIRION_LLM_API_BASE,
      apiKey: apiKey ?? "",
    };

    ideMessenger.post("config/addModel", { model });
    ideMessenger.post("config/openProfile", { profileId: "local" });

    void dispatch(
      updateSelectedModelByRole({
        selectedProfile,
        role: "chat",
        modelTitle: model.title,
      }),
    );

    onDone();
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="mx-auto max-w-md p-6">
          <h1 className="mb-0 text-center text-2xl">Airion LLM に接続</h1>

          <div className="my-8 flex flex-col gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Airion APIキー
              </label>
              <Input
                id="apiKey"
                className="w-full"
                type="password"
                placeholder="Airion APIキーを入力してください"
                {...formMethods.register("apiKey")}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!apiKey?.trim()}>
            接続する
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddModelForm;
