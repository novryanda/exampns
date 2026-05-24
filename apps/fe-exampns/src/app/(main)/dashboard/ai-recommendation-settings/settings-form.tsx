"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { SmallActionButton } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { AiRecommendationSettings } from "@/server/admin-data";
import { initialAdminActionState } from "@/server/admin-action-state";
import { updateAiRecommendationSettingsAction } from "@/server/admin-actions";

function ToggleField({
  name,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  readonly name: string;
  readonly label: string;
  readonly description?: string;
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
      <div>
        <p className="font-medium text-slate-950">{label}</p>
        {description ? <p className="text-slate-500 text-sm">{description}</p> : null}
      </div>
      <>
        <input type="hidden" name={name} value={checked ? "true" : "false"} />
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </>
    </div>
  );
}

export function AiRecommendationSettingsForm({
  settings,
}: {
  readonly settings: AiRecommendationSettings;
}) {
  const [state, formAction, isPending] = useActionState(
    updateAiRecommendationSettingsAction,
    initialAdminActionState,
  );
  const [enabled, setEnabled] = useState(settings.enabled);
  const [fallbackEnabled, setFallbackEnabled] = useState(settings.fallbackEnabled);
  const [showSummary, setShowSummary] = useState(settings.showSummary);
  const [showWeakAreas, setShowWeakAreas] = useState(settings.showWeakAreas);
  const [showNextTryoutStrategy, setShowNextTryoutStrategy] = useState(settings.showNextTryoutStrategy);
  const [enableResultPageBanner, setEnableResultPageBanner] = useState(settings.enableResultPageBanner);
  const [errorNotification, setErrorNotification] = useState(settings.errorNotification);
  const [retryFailedJob, setRetryFailedJob] = useState(settings.retryFailedJob);
  const [providerName, setProviderName] = useState(settings.providerName);
  const [logLevel, setLogLevel] = useState(settings.logLevel);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="contents">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <ToggleField
            name="enabled"
            label="Enable AI Recommendation"
            description="Aktifkan rekomendasi AI setelah hasil tryout siap."
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <ToggleField
            name="fallbackEnabled"
            label="Fallback Enabled"
            description="Gunakan fallback logic jika AI provider gagal merespons."
            checked={fallbackEnabled}
            onCheckedChange={setFallbackEnabled}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="font-medium text-slate-700 text-sm" htmlFor="providerName">
              Model / Provider Name
            </label>
            <input type="hidden" name="providerName" value={providerName} />
            <Select value={providerName} onValueChange={setProviderName}>
              <SelectTrigger id="providerName" className="w-full rounded-xl border-slate-200 bg-white">
                <SelectValue placeholder="Pilih model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OpenAI GPT-4o-mini via n8n">OpenAI GPT-4o-mini via n8n</SelectItem>
                <SelectItem value="OpenAI GPT-4.1 mini via n8n">OpenAI GPT-4.1 mini via n8n</SelectItem>
                <SelectItem value="Custom LLM via n8n">Custom LLM via n8n</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="font-medium text-slate-700 text-sm" htmlFor="timeoutSeconds">
              AI Processing Timeout (detik)
            </label>
            <Input
              id="timeoutSeconds"
              name="timeoutSeconds"
              className="rounded-xl border-slate-200"
              defaultValue={settings.timeoutSeconds}
              type="number"
              min={5}
              max={300}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="grid gap-2">
          <label className="font-medium text-slate-700 text-sm" htmlFor="weakAreaAccuracyThreshold">
            Weak Area Accuracy Threshold (%)
          </label>
          <Input
            id="weakAreaAccuracyThreshold"
            name="weakAreaAccuracyThreshold"
            className="rounded-xl border-slate-200"
            defaultValue={settings.weakAreaAccuracyThreshold}
            type="number"
            min={1}
            max={100}
          />
        </div>
        <div className="grid gap-2">
          <label className="font-medium text-slate-700 text-sm" htmlFor="minimumQuestionsPerTopic">
            Minimum Questions per Topic
          </label>
          <Input
            id="minimumQuestionsPerTopic"
            name="minimumQuestionsPerTopic"
            className="rounded-xl border-slate-200"
            defaultValue={settings.minimumQuestionsPerTopic}
            type="number"
            min={1}
            max={100}
          />
        </div>
        <div className="grid gap-2">
          <label className="font-medium text-slate-700 text-sm" htmlFor="maxWeakAreas">
            Max Weak Areas
          </label>
          <Input
            id="maxWeakAreas"
            name="maxWeakAreas"
            className="rounded-xl border-slate-200"
            defaultValue={settings.maxWeakAreas}
            type="number"
            min={1}
            max={20}
          />
        </div>
        <div className="grid gap-2">
          <label className="font-medium text-slate-700 text-sm" htmlFor="priorityScoreFormula">
            Priority Score Formula
          </label>
          <Input
            id="priorityScoreFormula"
            name="priorityScoreFormula"
            className="rounded-xl border-slate-200"
            defaultValue={settings.priorityScoreFormula}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ToggleField name="showSummary" label="Show Summary" checked={showSummary} onCheckedChange={setShowSummary} />
        <ToggleField
          name="showWeakAreas"
          label="Show Weak Areas"
          checked={showWeakAreas}
          onCheckedChange={setShowWeakAreas}
        />
        <ToggleField
          name="showNextTryoutStrategy"
          label="Show Next Tryout Strategy"
          checked={showNextTryoutStrategy}
          onCheckedChange={setShowNextTryoutStrategy}
        />
        <ToggleField
          name="enableResultPageBanner"
          label="Enable Result Page Banner"
          checked={enableResultPageBanner}
          onCheckedChange={setEnableResultPageBanner}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ToggleField
          name="errorNotification"
          label="Error Notification"
          checked={errorNotification}
          onCheckedChange={setErrorNotification}
        />
        <ToggleField
          name="retryFailedJob"
          label="Retry Failed Job"
          checked={retryFailedJob}
          onCheckedChange={setRetryFailedJob}
        />
        <div className="grid gap-2 md:col-span-2">
          <label className="font-medium text-slate-700 text-sm" htmlFor="logLevel">
            Log Level
          </label>
          <input type="hidden" name="logLevel" value={logLevel} />
          <Select value={logLevel} onValueChange={(value) => setLogLevel(value as AiRecommendationSettings["logLevel"])}>
            <SelectTrigger id="logLevel" className="w-full rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih log level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="debug">Debug</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warn">Warn</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SmallActionButton>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</SmallActionButton>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-slate-200 bg-white"
          onClick={() => window.location.reload()}
        >
          Reset ke Backend
        </Button>
        <Button type="button" variant="outline" className="rounded-xl border-slate-200 bg-white">
          Test Konfigurasi
        </Button>
      </div>
    </form>
  );
}
