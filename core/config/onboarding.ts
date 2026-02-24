import { ConfigYaml } from "@continuedev/config-yaml";
import {
  AIRION_LLM_API_BASE,
  AIRION_LLM_MODEL,
  AIRION_LLM_TITLE,
} from "./default";

export function setupBestConfig(config: ConfigYaml): ConfigYaml {
  return {
    ...config,
    models: config.models,
  };
}

export function setupLocalConfig(config: ConfigYaml): ConfigYaml {
  return setupAirionConfig(config, "");
}

export function setupQuickstartConfig(config: ConfigYaml): ConfigYaml {
  return config;
}

export function setupAirionConfig(
  config: ConfigYaml,
  apiKey: string,
): ConfigYaml {
  return {
    ...config,
    models: [
      {
        name: AIRION_LLM_TITLE,
        provider: "openai",
        model: AIRION_LLM_MODEL,
        apiBase: AIRION_LLM_API_BASE,
        apiKey: apiKey,
        roles: ["chat", "edit", "apply", "autocomplete"],
      },
      ...(config.models ?? []),
    ],
  };
}

export function setupProviderConfig(
  config: ConfigYaml,
  provider: string,
  apiKey: string,
): ConfigYaml {
  return setupAirionConfig(config, apiKey);
}
