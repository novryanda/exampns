"use client";

import { useActionState, useEffect } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialAdminActionState } from "@/server/admin-action-state";
import { updateAiRecommendationSettingsAction } from "@/server/admin-actions";
import type { AiRecommendationSettings } from "@/server/admin-data";

function ToggleField({
  name,
  label,
  defaultChecked,
}: {
  readonly name: string;
  readonly label: string;
  readonly defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4" />
    </div>
  );
}

export function AiRecommendationSettingsForm({ settings }: { readonly settings: AiRecommendationSettings }) {
  const [state, formAction, isPending] = useActionState(updateAiRecommendationSettingsAction, initialAdminActionState);

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
    <form action={formAction} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ToggleField name="enabled" label="AI Recommendation Enabled" defaultChecked={settings.enabled} />
        <ToggleField name="fallbackEnabled" label="Fallback Enabled" defaultChecked={settings.fallbackEnabled} />
        <ToggleField name="showSummary" label="Show Summary" defaultChecked={settings.showSummary} />
        <ToggleField name="showWeakAreas" label="Show Weak Areas" defaultChecked={settings.showWeakAreas} />
        <ToggleField
          name="showNextTryoutStrategy"
          label="Show Next Tryout Strategy"
          defaultChecked={settings.showNextTryoutStrategy}
        />
        <ToggleField
          name="enableResultPageBanner"
          label="Result Page Banner"
          defaultChecked={settings.enableResultPageBanner}
        />
        <ToggleField name="errorNotification" label="Error Notification" defaultChecked={settings.errorNotification} />
        <ToggleField name="retryFailedJob" label="Retry Failed Job" defaultChecked={settings.retryFailedJob} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="providerName">Provider Name</Label>
          <Input
            id="providerName"
            name="providerName"
            defaultValue={settings.providerName}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="timeoutSeconds">Timeout Seconds</Label>
          <Input
            id="timeoutSeconds"
            name="timeoutSeconds"
            type="number"
            min={1}
            defaultValue={settings.timeoutSeconds}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="weakAreaAccuracyThreshold">Weak Area Threshold</Label>
          <Input
            id="weakAreaAccuracyThreshold"
            name="weakAreaAccuracyThreshold"
            type="number"
            min={0}
            max={100}
            defaultValue={settings.weakAreaAccuracyThreshold}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="minimumQuestionsPerTopic">Minimum Questions Per Topic</Label>
          <Input
            id="minimumQuestionsPerTopic"
            name="minimumQuestionsPerTopic"
            type="number"
            min={1}
            defaultValue={settings.minimumQuestionsPerTopic}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxWeakAreas">Max Weak Areas</Label>
          <Input
            id="maxWeakAreas"
            name="maxWeakAreas"
            type="number"
            min={1}
            defaultValue={settings.maxWeakAreas}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="logLevel">Log Level</Label>
          <Select name="logLevel" defaultValue={settings.logLevel}>
            <SelectTrigger id="logLevel" className="rounded-xl border-slate-200 bg-white">
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

      <div className="grid gap-2">
        <Label htmlFor="priorityScoreFormula">Priority Score Formula</Label>
        <Textarea
          id="priorityScoreFormula"
          name="priorityScoreFormula"
          defaultValue={settings.priorityScoreFormula}
          className="min-h-28 rounded-xl border-slate-200"
          required
        />
      </div>

      <Button type="submit" className="w-fit rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Konfigurasi"}
      </Button>
    </form>
  );
}
