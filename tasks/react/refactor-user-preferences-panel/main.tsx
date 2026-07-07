"use client";

import { useState } from "react";

type DisplayTheme = "system" | "light" | "dark";
type Timezone = "America/New_York" | "Europe/London" | "Asia/Tokyo";
type SaveMode = "success" | "error";

type UserPreferences = {
  emailNotifications: boolean;
  productUpdates: boolean;
  weeklySummary: boolean;
  compactLayout: boolean;
  showAvatars: boolean;
  theme: DisplayTheme;
  timezone: Timezone;
};

const INITIAL_PREFERENCES: UserPreferences = {
  emailNotifications: true,
  productUpdates: false,
  weeklySummary: true,
  compactLayout: false,
  showAvatars: true,
  theme: "system",
  timezone: "America/New_York",
};

function samePreferences(left: UserPreferences, right: UserPreferences) {
  return (
    left.emailNotifications === right.emailNotifications &&
    left.productUpdates === right.productUpdates &&
    left.weeklySummary === right.weeklySummary &&
    left.compactLayout === right.compactLayout &&
    left.showAvatars === right.showAvatars &&
    left.theme === right.theme &&
    left.timezone === right.timezone
  );
}

function saveUserPreferences(
  preferences: UserPreferences,
  mode: SaveMode,
): Promise<void> {
  console.info("Saving preferences", preferences);

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (mode === "error") {
        reject(new Error("Preferences could not be saved. Try again."));
        return;
      }

      resolve();
    }, 800);
  });
}

export default function UserPreferencesPanel() {
  const [preferences, setPreferences] = useState({
    emailNotifications: INITIAL_PREFERENCES.emailNotifications,
    productUpdates: INITIAL_PREFERENCES.productUpdates,
    weeklySummary: INITIAL_PREFERENCES.weeklySummary,
    compactLayout: INITIAL_PREFERENCES.compactLayout,
    showAvatars: INITIAL_PREFERENCES.showAvatars,
    timezone: INITIAL_PREFERENCES.timezone,
    theme: INITIAL_PREFERENCES.theme,
  });

  const [savedPreferences, setSavedPreferences] = useState({
    emailNotifications: INITIAL_PREFERENCES.emailNotifications,
    productUpdates: INITIAL_PREFERENCES.productUpdates,
    weeklySummary: INITIAL_PREFERENCES.weeklySummary,
    compactLayout: INITIAL_PREFERENCES.compactLayout,
    showAvatars: INITIAL_PREFERENCES.showAvatars,
    timezone: INITIAL_PREFERENCES.timezone,
    theme: INITIAL_PREFERENCES.theme,
  });

  const [saveMode, setSaveMode] = useState<SaveMode>("success");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleReset() {
    setPreferences(savedPreferences);

    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSave() {
    const preferencesToSave = preferences;

    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await saveUserPreferences(preferencesToSave, saveMode);

      setSavedPreferences({ ...preferencesToSave });

      setSuccessMessage("Preferences saved successfully.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Preferences could not be saved.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const updatePreference = (nextPreferences: UserPreferences) => {
    setPreferences(nextPreferences);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const hasUnsavedChanges = !samePreferences(preferences, savedPreferences);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            User preferences
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Update notification and display settings for this admin user.
          </p>
        </div>

        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-800">Save simulation</span>
          <select
            className="rounded border border-slate-300 bg-white px-3 py-2"
            onChange={(event) => setSaveMode(event.target.value as SaveMode)}
            value={saveMode}
          >
            <option value="success">Succeed</option>
            <option value="error">Fail</option>
          </select>
        </label>
      </div>

      <section className="mt-6 rounded border border-slate-300 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Notification preferences
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Control which account messages are sent by email.
            </p>
          </div>

          <StatusBadge hasUnsavedChanges={hasUnsavedChanges} />
        </div>

        <div className="mt-5 grid gap-3">
          <CheckboxRow
            title="Email notifications"
            description="Receive important account and billing notifications."
            checked={preferences.emailNotifications}
            onChange={(nextValue) =>
              updatePreference({
                ...preferences,
                emailNotifications: nextValue,
              })
            }
          />

          <CheckboxRow
            title="Product updates"
            description="Receive occasional updates about new product features."
            checked={preferences.productUpdates}
            onChange={(nextValue) =>
              updatePreference({
                ...preferences,
                productUpdates: nextValue,
              })
            }
          />

          <CheckboxRow
            title="Weekly summary"
            description="Receive a weekly summary of workspace activity."
            checked={preferences.weeklySummary}
            onChange={(nextValue) =>
              updatePreference({
                ...preferences,
                weeklySummary: nextValue,
              })
            }
          />
        </div>
      </section>

      <section className="mt-4 rounded border border-slate-300 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Display preferences
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Adjust the dashboard layout and visual defaults.
            </p>
          </div>

          <StatusBadge hasUnsavedChanges={hasUnsavedChanges} />
        </div>

        <div className="mt-5 grid gap-3">
          <CheckboxRow
            title="Compact layout"
            description="Use denser spacing in tables and dashboard panels."
            checked={preferences.compactLayout}
            onChange={(nextValue) =>
              updatePreference({
                ...preferences,
                compactLayout: nextValue,
              })
            }
          />
          <CheckboxRow
            title="Show avatars"
            description="Show user avatars beside people in lists and activity feeds."
            checked={preferences.showAvatars}
            onChange={(nextValue) =>
              updatePreference({
                ...preferences,
                showAvatars: nextValue,
              })
            }
          />

          <label className="grid gap-1">
            <span className="font-medium text-slate-900">Theme</span>
            <select
              className="rounded border border-slate-300 bg-white px-3 py-2"
              onChange={(event) =>
                updatePreference({
                  ...preferences,
                  theme: event.target.value as DisplayTheme,
                })
              }
              value={preferences.theme}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="font-medium text-slate-900">Timezone</span>
            <select
              className="rounded border border-slate-300 bg-white px-3 py-2"
              onChange={(event) =>
                updatePreference({
                  ...preferences,
                  timezone: event.target.value as Timezone,
                })
              }
              value={preferences.timezone}
            >
              <option value="America/New_York">New York</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </label>
        </div>
      </section>

      <SaveStatusPanel
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSave={handleSave}
        onReset={handleReset}
      />
    </main>
  );
}

type SaveStatusPanelProps = {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSave: () => void;
  onReset: () => void;
};

const SaveStatusPanel = ({
  hasUnsavedChanges,
  isSaving,
  successMessage,
  errorMessage,
  onSave,
  onReset,
}: SaveStatusPanelProps) => {
  return (
    <section
      aria-live="polite"
      className="mt-4 rounded border border-slate-300 bg-slate-50 p-4"
    >
      <p className="font-medium text-slate-950">
        {!hasUnsavedChanges
          ? "All preferences are saved."
          : "You have unsaved preference changes."}
      </p>

      {isSaving ? (
        <p className="mt-2 text-sm text-slate-700">Saving preferences...</p>
      ) : null}

      {successMessage ? (
        <p className="mt-2 text-sm font-medium text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-2 text-sm font-medium text-red-700">{errorMessage}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className="rounded bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!hasUnsavedChanges || isSaving}
          onClick={onSave}
          type="button"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>

        <button
          className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:text-slate-400"
          disabled={!hasUnsavedChanges || isSaving}
          onClick={onReset}
          type="button"
        >
          Reset changes
        </button>
      </div>
    </section>
  );
};

type CheckboxRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (nextValue: boolean) => void;
};

const CheckboxRow = ({
  title,
  description,
  checked,
  onChange,
}: CheckboxRowProps) => {
  return (
    <label className="flex items-start justify-between gap-4 rounded border border-slate-200 p-3">
      <span>
        <span className="block font-medium text-slate-900">{title}</span>
        <span className="mt-1 block text-sm text-slate-600">{description}</span>
      </span>
      <input
        checked={checked}
        className="mt-1"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
    </label>
  );
};

function StatusBadge({ hasUnsavedChanges }: { hasUnsavedChanges: boolean }) {
  return hasUnsavedChanges ? (
    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
      Unsaved changes
    </span>
  ) : (
    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900">
      Saved
    </span>
  );
}
