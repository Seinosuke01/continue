import { ConfigYaml } from "@continuedev/config-yaml";

export const AIRION_LLM_API_BASE = "https://api.airion.com/v1";
export const AIRION_LLM_MODEL = "airion-ladder-llm";
export const AIRION_LLM_TITLE = "Airion ラダー特化LLM";

export const defaultConfig: ConfigYaml = {
  name: "Local Config",
  version: "1.0.0",
  schema: "v1",
  models: [
    {
      name: AIRION_LLM_TITLE,
      provider: "openai",
      model: AIRION_LLM_MODEL,
      apiBase: AIRION_LLM_API_BASE,
      roles: ["chat", "edit", "apply", "autocomplete"],
    },
  ],
};
