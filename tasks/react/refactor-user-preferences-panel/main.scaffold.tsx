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
  const [savedEmailNotifications, setSavedEmailNotifications] = useState(
    INITIAL_PREFERENCES.emailNotifications,
  );
  const [savedProductUpdates, setSavedProductUpdates] = useState(
    INITIAL_PREFERENCES.productUpdates,
  );
  const [savedWeeklySummary, setSavedWeeklySummary] = useState(
    INITIAL_PREFERENCES.weeklySummary,
  );
  const [savedCompactLayout, setSavedCompactLayout] = useState(
    INITIAL_PREFERENCES.compactLayout,
  );
  const [savedShowAvatars, setSavedShowAvatars] = useState(
    INITIAL_PREFERENCES.showAvatars,
  );
  const [savedTheme, setSavedTheme] = useState(INITIAL_PREFERENCES.theme);
  const [savedTimezone, setSavedTimezone] = useState(
    INITIAL_PREFERENCES.timezone,
  );

  const [emailNotifications, setEmailNotifications] = useState(
    INITIAL_PREFERENCES.emailNotifications,
  );
  const [productUpdates, setProductUpdates] = useState(
    INITIAL_PREFERENCES.productUpdates,
  );
  const [weeklySummary, setWeeklySummary] = useState(
    INITIAL_PREFERENCES.weeklySummary,
  );
  const [compactLayout, setCompactLayout] = useState(
    INITIAL_PREFERENCES.compactLayout,
  );
  const [showAvatars, setShowAvatars] = useState(
    INITIAL_PREFERENCES.showAvatars,
  );
  const [theme, setTheme] = useState<DisplayTheme>(INITIAL_PREFERENCES.theme);
  const [timezone, setTimezone] = useState<Timezone>(
    INITIAL_PREFERENCES.timezone,
  );

  const [saveMode, setSaveMode] = useState<SaveMode>("success");
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [canReset, setCanReset] = useState(false);
  const [summaryText, setSummaryText] = useState("All preferences are saved.");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function getSavedPreferences(): UserPreferences {
    return {
      compactLayout: savedCompactLayout,
      emailNotifications: savedEmailNotifications,
      productUpdates: savedProductUpdates,
      showAvatars: savedShowAvatars,
      theme: savedTheme,
      timezone: savedTimezone,
      weeklySummary: savedWeeklySummary,
    };
  }

  function updateUnsavedState(nextPreferences: UserPreferences) {
    const nextHasUnsavedChanges = !samePreferences(
      nextPreferences,
      getSavedPreferences(),
    );

    setHasUnsavedChanges(nextHasUnsavedChanges);
    setCanSave(nextHasUnsavedChanges);
    setCanReset(nextHasUnsavedChanges);
    setSummaryText(
      nextHasUnsavedChanges
        ? "You have unsaved preference changes."
        : "All preferences are saved.",
    );
  }

  function getCurrentPreferences(): UserPreferences {
    return {
      compactLayout,
      emailNotifications,
      productUpdates,
      showAvatars,
      theme,
      timezone,
      weeklySummary,
    };
  }

  function handleEmailNotificationsChange(nextValue: boolean) {
    setEmailNotifications(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout,
      emailNotifications: nextValue,
      productUpdates,
      showAvatars,
      theme,
      timezone,
      weeklySummary,
    });
  }

  function handleProductUpdatesChange(nextValue: boolean) {
    setProductUpdates(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout,
      emailNotifications,
      productUpdates: nextValue,
      showAvatars,
      theme,
      timezone,
      weeklySummary,
    });
  }

  function handleWeeklySummaryChange(nextValue: boolean) {
    setWeeklySummary(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout,
      emailNotifications,
      productUpdates,
      showAvatars,
      theme,
      timezone,
      weeklySummary: nextValue,
    });
  }

  function handleCompactLayoutChange(nextValue: boolean) {
    setCompactLayout(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout: nextValue,
      emailNotifications,
      productUpdates,
      showAvatars,
      theme,
      timezone,
      weeklySummary,
    });
  }

  function handleShowAvatarsChange(nextValue: boolean) {
    setShowAvatars(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout,
      emailNotifications,
      productUpdates,
      showAvatars: nextValue,
      theme,
      timezone,
      weeklySummary,
    });
  }

  function handleThemeChange(nextValue: DisplayTheme) {
    setTheme(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout,
      emailNotifications,
      productUpdates,
      showAvatars,
      theme: nextValue,
      timezone,
      weeklySummary,
    });
  }

  function handleTimezoneChange(nextValue: Timezone) {
    setTimezone(nextValue);
    setSuccessMessage("");
    setErrorMessage("");
    updateUnsavedState({
      compactLayout,
      emailNotifications,
      productUpdates,
      showAvatars,
      theme,
      timezone: nextValue,
      weeklySummary,
    });
  }

  function handleReset() {
    setEmailNotifications(savedEmailNotifications);
    setProductUpdates(savedProductUpdates);
    setWeeklySummary(savedWeeklySummary);
    setCompactLayout(savedCompactLayout);
    setShowAvatars(savedShowAvatars);
    setTheme(savedTheme);
    setTimezone(savedTimezone);
    setSuccessMessage("");
    setErrorMessage("");
    setHasUnsavedChanges(false);
    setCanSave(false);
    setCanReset(false);
    setSummaryText("All preferences are saved.");
  }

  async function handleSave() {
    const preferencesToSave = getCurrentPreferences();

    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await saveUserPreferences(preferencesToSave, saveMode);
      setSavedEmailNotifications(preferencesToSave.emailNotifications);
      setSavedProductUpdates(preferencesToSave.productUpdates);
      setSavedWeeklySummary(preferencesToSave.weeklySummary);
      setSavedCompactLayout(preferencesToSave.compactLayout);
      setSavedShowAvatars(preferencesToSave.showAvatars);
      setSavedTheme(preferencesToSave.theme);
      setSavedTimezone(preferencesToSave.timezone);
      setHasUnsavedChanges(false);
      setCanSave(false);
      setCanReset(false);
      setSummaryText("All preferences are saved.");
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

          {hasUnsavedChanges ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
              Unsaved changes
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900">
              Saved
            </span>
          )}
        </div>

        <div className="mt-5 grid gap-3">
          <label className="flex items-start justify-between gap-4 rounded border border-slate-200 p-3">
            <span>
              <span className="block font-medium text-slate-900">
                Email notifications
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Receive important account and billing notifications.
              </span>
            </span>
            <input
              checked={emailNotifications}
              className="mt-1"
              onChange={(event) =>
                handleEmailNotificationsChange(event.target.checked)
              }
              type="checkbox"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded border border-slate-200 p-3">
            <span>
              <span className="block font-medium text-slate-900">
                Product updates
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Receive occasional updates about new product features.
              </span>
            </span>
            <input
              checked={productUpdates}
              className="mt-1"
              onChange={(event) =>
                handleProductUpdatesChange(event.target.checked)
              }
              type="checkbox"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded border border-slate-200 p-3">
            <span>
              <span className="block font-medium text-slate-900">
                Weekly summary
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Receive a weekly summary of workspace activity.
              </span>
            </span>
            <input
              checked={weeklySummary}
              className="mt-1"
              onChange={(event) =>
                handleWeeklySummaryChange(event.target.checked)
              }
              type="checkbox"
            />
          </label>
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

          {hasUnsavedChanges ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
              Unsaved changes
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900">
              Saved
            </span>
          )}
        </div>

        <div className="mt-5 grid gap-3">
          <label className="flex items-start justify-between gap-4 rounded border border-slate-200 p-3">
            <span>
              <span className="block font-medium text-slate-900">
                Compact layout
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Use denser spacing in tables and dashboard panels.
              </span>
            </span>
            <input
              checked={compactLayout}
              className="mt-1"
              onChange={(event) =>
                handleCompactLayoutChange(event.target.checked)
              }
              type="checkbox"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded border border-slate-200 p-3">
            <span>
              <span className="block font-medium text-slate-900">
                Show avatars
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Show user avatars beside people in lists and activity feeds.
              </span>
            </span>
            <input
              checked={showAvatars}
              className="mt-1"
              onChange={(event) => handleShowAvatarsChange(event.target.checked)}
              type="checkbox"
            />
          </label>

          <label className="grid gap-1">
            <span className="font-medium text-slate-900">Theme</span>
            <select
              className="rounded border border-slate-300 bg-white px-3 py-2"
              onChange={(event) =>
                handleThemeChange(event.target.value as DisplayTheme)
              }
              value={theme}
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
                handleTimezoneChange(event.target.value as Timezone)
              }
              value={timezone}
            >
              <option value="America/New_York">New York</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </label>
        </div>
      </section>

      <section
        aria-live="polite"
        className="mt-4 rounded border border-slate-300 bg-slate-50 p-4"
      >
        <p className="font-medium text-slate-950">{summaryText}</p>

        {isSaving ? (
          <p className="mt-2 text-sm text-slate-700">Saving preferences...</p>
        ) : null}

        {successMessage ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="mt-2 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!canSave || isSaving}
            onClick={handleSave}
            type="button"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>

          <button
            className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:text-slate-400"
            disabled={!canReset || isSaving}
            onClick={handleReset}
            type="button"
          >
            Reset changes
          </button>
        </div>
      </section>
    </main>
  );
}
