import path from "node:path";

import {
  ALLOWED_CATEGORIES,
  ALLOWED_DIFFICULTIES,
  ALLOWED_TASK_TYPES,
  MASTERY_LABELS,
  collectTaskDirs,
  fileExists,
  getActiveAttempt,
  getMarkdownSection,
  parseReviewMastery,
  parseReviewVerdict,
  readTaskRecord,
  readTopicCatalog,
} from "./lib/task-data.mjs";

const REQUIRED_TASK_KEYS = [
  "title",
  "category",
  "taskType",
  "difficulty",
  "primarySkill",
  "secondarySkill",
  "problemShape",
  "interviewFocus",
  "reviewFocus",
  "tags",
];
const OPTIONAL_TASK_KEYS = ["hasPreview", "previewEntry"];
const REQUIRED_INTERVIEWER_KEYS = [
  "schemaVersion",
  "plannedFollowUps",
  "primaryTopics",
  "secondaryTopics",
];
const REQUIRED_REVIEW_SECTIONS = [
  "Requirement check",
  "Mastery",
  "Strengths",
  "Weaknesses",
  "Missed edge cases",
  "What a stronger candidate would improve",
  "Main learning takeaway",
  "Suggested next step",
  "Follow-up questions",
  "Final verdict",
];
const ATTEMPT_STATUSES = new Set([
  "ready",
  "in-progress",
  "ready-for-review",
  "reviewed",
  "abandoned",
  "reset",
]);
const STAGE_STATUSES = new Set([
  "locked",
  "available",
  "in-progress",
  "completed",
  "skipped",
]);
const CHECKPOINT_OUTCOMES = new Set([
  "passed",
  "passed-with-issues",
  "incomplete",
]);
const CHECKPOINT_SIGNALS = new Set(["demonstrated", "uncertain", "gap"]);
const COACH_MODES = new Set([
  "hint",
  "concept-explanation",
  "debug-nudge",
  "next-step",
  "rubber-duck",
]);
const REQUIREMENT_VERDICTS = new Set(["yes", "partially", "no"]);
const TOPIC_OUTCOMES = new Set([
  "needs-practice",
  "improved",
  "demonstrated",
]);
const TOPIC_PRIORITIES = new Set(["low", "medium", "high"]);
const INDEPENDENCE_VALUES = new Set([
  "independent",
  "minimal-help",
  "guided",
  "not-demonstrated",
]);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function isTimestamp(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function firstNonEmptyLine(content) {
  return content.split(/\r?\n/).find((line) => line.trim())?.trim() ?? "";
}

function validateKnownKeys(data, required, optional, label, errors) {
  for (const key of required) {
    if (data[key] === undefined || data[key] === "") {
      errors.push(`${label} missing key: ${key}`);
    }
  }

  for (const key of Object.keys(data)) {
    if (!required.includes(key) && !optional.includes(key)) {
      errors.push(`${label} includes unsupported key: ${key}`);
    }
  }
}

function getLevelThreeHeadings(sectionLines) {
  return sectionLines
    .filter((line) => line.trim().startsWith("### "))
    .map((line) => line.trim().slice(4));
}

function getFollowUpTopicIds(sectionLines) {
  const topicHeadingIndex = sectionLines.findIndex(
    (line) => line.trim() === "### Topics",
  );

  if (topicHeadingIndex === -1) {
    return [];
  }

  const topics = [];

  for (const line of sectionLines.slice(topicHeadingIndex + 1)) {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      break;
    }

    if (trimmed.startsWith("- ")) {
      topics.push(trimmed.slice(2).trim());
    }
  }

  return topics;
}

function validateTopicCatalog(catalog) {
  const errors = [];

  if (!isRecord(catalog) || catalog.schemaVersion !== 1) {
    errors.push("schemaVersion must be 1");
  }

  if (!Array.isArray(catalog?.topics)) {
    errors.push("topics must be an array");
    return errors;
  }

  const seenIds = new Set();

  for (const [index, topic] of catalog.topics.entries()) {
    const label = `topics[${index}]`;

    if (!isRecord(topic)) {
      errors.push(`${label} must be an object`);
      continue;
    }

    if (!isNonEmptyString(topic.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id)) {
      errors.push(`${label}.id must be lowercase kebab-case`);
    } else if (seenIds.has(topic.id)) {
      errors.push(`${label}.id is duplicated: ${topic.id}`);
    } else {
      seenIds.add(topic.id);
    }

    if (!isNonEmptyString(topic.label)) {
      errors.push(`${label}.label must be a non-empty string`);
    }

    if (!ALLOWED_CATEGORIES.includes(topic.category)) {
      errors.push(`${label}.category is invalid: ${topic.category}`);
    }

    if (!isNonEmptyString(topic.description)) {
      errors.push(`${label}.description must be a non-empty string`);
    }

    if (!isStringArray(topic.aliases)) {
      errors.push(`${label}.aliases must be a string array`);
    }
  }

  return errors;
}

function validateTaskFrontmatter(record, errors) {
  const data = record.taskFrontmatter;
  validateKnownKeys(
    data,
    REQUIRED_TASK_KEYS,
    OPTIONAL_TASK_KEYS,
    "task.md frontmatter",
    errors,
  );

  if (data.category !== record.category) {
    errors.push(
      `task.md category mismatch (expected "${record.category}", got "${data.category}")`,
    );
  }

  if (!ALLOWED_CATEGORIES.includes(data.category)) {
    errors.push(`task.md category is invalid: ${data.category}`);
  }

  if (!ALLOWED_TASK_TYPES.includes(data.taskType)) {
    errors.push(`task.md taskType is invalid: ${data.taskType}`);
  }

  if (!ALLOWED_DIFFICULTIES.includes(data.difficulty)) {
    errors.push(`task.md difficulty is invalid: ${data.difficulty}`);
  }

  for (const key of [
    "title",
    "primarySkill",
    "secondarySkill",
    "problemShape",
    "interviewFocus",
  ]) {
    if (!isNonEmptyString(data[key])) {
      errors.push(`task.md ${key} must be a non-empty string`);
    }
  }

  for (const key of ["reviewFocus", "tags"]) {
    if (!isStringArray(data[key]) || data[key].length === 0) {
      errors.push(`task.md ${key} must be a non-empty string list`);
    }
  }

  if (data.hasPreview !== undefined && typeof data.hasPreview !== "boolean") {
    errors.push("task.md hasPreview must be true or false");
  }

  if (data.hasPreview === true && !isNonEmptyString(data.previewEntry)) {
    errors.push("task.md previewEntry is required when hasPreview is true");
  }

  if (data.previewEntry !== undefined && data.hasPreview !== true) {
    errors.push("task.md previewEntry requires hasPreview to be true");
  }

  for (const heading of ["Context", "Goal", "Requirements", "Acceptance Criteria"]) {
    if (!new RegExp(`^## ${heading}$`, "m").test(record.taskBody)) {
      errors.push(`task.md missing section: ${heading}`);
    }
  }
}

async function validateTaskFiles(record, errors) {
  const mainTs = path.join(record.dir, "main.ts");
  const mainTsx = path.join(record.dir, "main.tsx");
  const scaffoldTs = path.join(record.dir, "main.scaffold.ts");
  const scaffoldTsx = path.join(record.dir, "main.scaffold.tsx");
  const [hasMainTs, hasMainTsx, hasScaffoldTs, hasScaffoldTsx] =
    await Promise.all([
      fileExists(mainTs),
      fileExists(mainTsx),
      fileExists(scaffoldTs),
      fileExists(scaffoldTsx),
    ]);

  if (hasMainTs === hasMainTsx) {
    errors.push("expected exactly one of main.ts or main.tsx");
  }

  if (hasMainTs && !hasScaffoldTs) {
    errors.push("missing main.scaffold.ts");
  }

  if (hasMainTsx && !hasScaffoldTsx) {
    errors.push("missing main.scaffold.tsx");
  }

  const previewEntry = record.taskFrontmatter.previewEntry;

  if (record.taskFrontmatter.hasPreview === true && isNonEmptyString(previewEntry)) {
    const resolvedEntry = path.resolve(record.dir, previewEntry);
    const relativeEntry = path.relative(record.dir, resolvedEntry);

    if (relativeEntry.startsWith("..") || path.isAbsolute(relativeEntry)) {
      errors.push("task.md previewEntry must stay inside the task directory");
    } else if (!(await fileExists(resolvedEntry))) {
      errors.push(`task.md previewEntry does not exist: ${previewEntry}`);
    }
  }
}

function validateInterviewer(record, topicIds, errors) {
  const data = record.interviewerFrontmatter;
  validateKnownKeys(
    data,
    REQUIRED_INTERVIEWER_KEYS,
    [],
    "interviewer.md frontmatter",
    errors,
  );

  if (data.schemaVersion !== 1) {
    errors.push("interviewer.md schemaVersion must be 1");
  }

  if (
    !Number.isInteger(data.plannedFollowUps) ||
    data.plannedFollowUps < 0 ||
    data.plannedFollowUps > 3
  ) {
    errors.push("interviewer.md plannedFollowUps must be an integer from 0 to 3");
  }

  if (
    !isStringArray(data.primaryTopics) ||
    data.primaryTopics.length < 1 ||
    data.primaryTopics.length > 2
  ) {
    errors.push("interviewer.md primaryTopics must contain 1 or 2 topic IDs");
  }

  if (!isStringArray(data.secondaryTopics) || data.secondaryTopics.length > 3) {
    errors.push("interviewer.md secondaryTopics must contain 0 to 3 topic IDs");
  }

  const declaredTopics = [
    ...(Array.isArray(data.primaryTopics) ? data.primaryTopics : []),
    ...(Array.isArray(data.secondaryTopics) ? data.secondaryTopics : []),
  ];

  if (new Set(declaredTopics).size !== declaredTopics.length) {
    errors.push("interviewer.md topic IDs must not be duplicated");
  }

  for (const topicId of declaredTopics) {
    if (!topicIds.has(topicId)) {
      errors.push(`interviewer.md references unknown topic: ${topicId}`);
    }
  }

  if (firstNonEmptyLine(record.interviewerBody) !== "# Interviewer Plan") {
    errors.push('interviewer.md must start with "# Interviewer Plan"');
  }

  const coreLines = getMarkdownSection(record.interviewerBody, "Core Task");
  const coreHeadings = getLevelThreeHeadings(coreLines);

  for (const heading of [
    "Purpose",
    "Expected evidence",
    "Checkpoint focus",
    "Review focus",
  ]) {
    if (!coreHeadings.includes(heading)) {
      errors.push(`interviewer.md Core Task missing section: ${heading}`);
    }
  }

  const followUpMatches = [
    ...record.interviewerBody.matchAll(/^## Follow-up (\d+)$/gm),
  ];

  if (followUpMatches.length !== data.plannedFollowUps) {
    errors.push(
      `interviewer.md plannedFollowUps is ${data.plannedFollowUps}, but ${followUpMatches.length} follow-up section(s) exist`,
    );
  }

  followUpMatches.forEach((match, index) => {
    const expectedNumber = index + 1;
    const actualNumber = Number(match[1]);

    if (actualNumber !== expectedNumber) {
      errors.push(`interviewer.md expected Follow-up ${expectedNumber}`);
    }

    const sectionLines = getMarkdownSection(
      record.interviewerBody,
      `Follow-up ${actualNumber}`,
    );
    const headings = getLevelThreeHeadings(sectionLines);

    for (const heading of [
      "Reveal",
      "Purpose",
      "Topics",
      "Expected evidence",
      "Review focus",
    ]) {
      if (!headings.includes(heading)) {
        errors.push(`interviewer.md Follow-up ${actualNumber} missing section: ${heading}`);
      }
    }

    const followUpTopics = getFollowUpTopicIds(sectionLines);

    if (followUpTopics.length === 0) {
      errors.push(`interviewer.md Follow-up ${actualNumber} must list at least one topic`);
    }

    for (const topicId of followUpTopics) {
      if (!declaredTopics.includes(topicId)) {
        errors.push(
          `interviewer.md Follow-up ${actualNumber} uses undeclared topic: ${topicId}`,
        );
      }
    }
  });
}

function validateCheckpoint(checkpoint, stageId, topicIds, errors) {
  if (!isRecord(checkpoint)) {
    errors.push(`session stage ${stageId} checkpoint must be an object`);
    return;
  }

  if (!isTimestamp(checkpoint.recordedAt)) {
    errors.push(`session stage ${stageId} checkpoint recordedAt is invalid`);
  }

  if (!CHECKPOINT_OUTCOMES.has(checkpoint.outcome)) {
    errors.push(`session stage ${stageId} checkpoint outcome is invalid`);
  }

  if (!isStringArray(checkpoint.observations)) {
    errors.push(`session stage ${stageId} checkpoint observations must be a string array`);
  }

  if (!Array.isArray(checkpoint.knowledgeSignals)) {
    errors.push(`session stage ${stageId} checkpoint knowledgeSignals must be an array`);
    return;
  }

  for (const signal of checkpoint.knowledgeSignals) {
    if (!isRecord(signal)) {
      errors.push(`session stage ${stageId} has an invalid knowledge signal`);
      continue;
    }

    if (!topicIds.has(signal.topicId)) {
      errors.push(`session stage ${stageId} references unknown topic: ${signal.topicId}`);
    }

    if (!CHECKPOINT_SIGNALS.has(signal.signal)) {
      errors.push(`session stage ${stageId} has invalid knowledge signal: ${signal.signal}`);
    }

    if (!isNonEmptyString(signal.evidence)) {
      errors.push(`session stage ${stageId} knowledge signal needs evidence`);
    }
  }
}

function validateStructuredReview(review, stageIds, topicIds, errors, label) {
  if (!isRecord(review)) {
    errors.push(`${label} review must be an object`);
    return;
  }

  if (!isTimestamp(review.reviewedAt)) {
    errors.push(`${label} review reviewedAt is invalid`);
  }

  if (!REQUIREMENT_VERDICTS.has(review.requirementVerdict)) {
    errors.push(`${label} review requirementVerdict is invalid`);
  }

  if (!isRecord(review.mastery)) {
    errors.push(`${label} review mastery must be an object`);
  } else {
    const { level, label: masteryLabel, reason } = review.mastery;

    if (!Number.isInteger(level) || !MASTERY_LABELS[level]) {
      errors.push(`${label} review mastery level must be from 1 to 5`);
    } else if (masteryLabel !== MASTERY_LABELS[level]) {
      errors.push(`${label} review mastery label must be "${MASTERY_LABELS[level]}"`);
    }

    if (!isNonEmptyString(reason)) {
      errors.push(`${label} review mastery reason must be non-empty`);
    }
  }

  if (typeof review.needsRepetition !== "boolean") {
    errors.push(`${label} review needsRepetition must be boolean`);
  }

  if (!Array.isArray(review.topicSignals)) {
    errors.push(`${label} review topicSignals must be an array`);
    return;
  }

  for (const signal of review.topicSignals) {
    if (!isRecord(signal)) {
      errors.push(`${label} review has an invalid topic signal`);
      continue;
    }

    if (!topicIds.has(signal.topicId)) {
      errors.push(`${label} review references unknown topic: ${signal.topicId}`);
    }

    if (!TOPIC_OUTCOMES.has(signal.outcome)) {
      errors.push(`${label} review topic outcome is invalid: ${signal.outcome}`);
    }

    if (signal.outcome === "needs-practice") {
      if (!TOPIC_PRIORITIES.has(signal.priority)) {
        errors.push(`${label} needs-practice topic requires low, medium, or high priority`);
      }
    } else if (signal.priority !== null) {
      errors.push(`${label} improved/demonstrated topic priority must be null`);
    }

    if (!INDEPENDENCE_VALUES.has(signal.independence)) {
      errors.push(`${label} review topic independence is invalid`);
    }

    if (!isNonEmptyString(signal.evidence)) {
      errors.push(`${label} review topic signal needs evidence`);
    }

    if (!isStringArray(signal.stageIds) || signal.stageIds.length === 0) {
      errors.push(`${label} review topic signal needs at least one stageId`);
    } else {
      for (const stageId of signal.stageIds) {
        if (!stageIds.has(stageId)) {
          errors.push(`${label} review topic signal references unknown stage: ${stageId}`);
        }
      }
    }
  }

  const expectedNeedsRepetition = review.topicSignals.some(
    (signal) =>
      signal?.outcome === "needs-practice" &&
      ["medium", "high"].includes(signal.priority),
  );

  if (review.needsRepetition !== expectedNeedsRepetition) {
    errors.push(`${label} review needsRepetition does not match topic priorities`);
  }
}

function validateSession(record, topicIds, errors) {
  const session = record.session;

  if (!isRecord(session) || session.schemaVersion !== 1) {
    errors.push("session.json schemaVersion must be 1");
    return;
  }

  if (session.taskSlug !== record.slug) {
    errors.push(
      `session.json taskSlug mismatch (expected "${record.slug}", got "${session.taskSlug}")`,
    );
  }

  if (!Array.isArray(session.attempts) || session.attempts.length === 0) {
    errors.push("session.json attempts must be a non-empty array");
    return;
  }

  const expectedStageIds = ["core"];

  for (let index = 1; index <= record.interviewerFrontmatter.plannedFollowUps; index += 1) {
    expectedStageIds.push(`follow-up-${index}`);
  }

  const attemptIds = new Set();

  for (const [index, attempt] of session.attempts.entries()) {
    const label = `session attempt ${index + 1}`;

    if (!isRecord(attempt)) {
      errors.push(`${label} must be an object`);
      continue;
    }

    if (attempt.id !== `attempt-${index + 1}` || attempt.number !== index + 1) {
      errors.push(`${label} must use id attempt-${index + 1} and number ${index + 1}`);
    }

    if (attemptIds.has(attempt.id)) {
      errors.push(`${label} id is duplicated: ${attempt.id}`);
    }
    attemptIds.add(attempt.id);

    if (!ATTEMPT_STATUSES.has(attempt.status)) {
      errors.push(`${label} status is invalid: ${attempt.status}`);
    }

    if (!isTimestamp(attempt.createdAt)) {
      errors.push(`${label} createdAt is invalid`);
    }

    if (attempt.startedAt !== null && !isTimestamp(attempt.startedAt)) {
      errors.push(`${label} startedAt must be null or an ISO UTC timestamp`);
    }

    if (attempt.endedAt !== null && !isTimestamp(attempt.endedAt)) {
      errors.push(`${label} endedAt must be null or an ISO UTC timestamp`);
    }

    if (attempt.status === "ready" && attempt.startedAt !== null) {
      errors.push(`${label} ready attempt must have startedAt null`);
    }

    if (["reviewed", "abandoned", "reset"].includes(attempt.status) && !attempt.endedAt) {
      errors.push(`${label} terminal status requires endedAt`);
    }

    if (
      ["ready-for-review", "reviewed", "abandoned", "reset"].includes(attempt.status) &&
      attempt.activeStageId !== null
    ) {
      errors.push(`${label} status ${attempt.status} requires activeStageId null`);
    }

    if (!Array.isArray(attempt.stages)) {
      errors.push(`${label} stages must be an array`);
      continue;
    }

    const actualStageIds = attempt.stages.map((stage) => stage?.id);
    const stageIds = new Set(actualStageIds);

    if (
      actualStageIds.length !== expectedStageIds.length ||
      expectedStageIds.some((stageId, stageIndex) => actualStageIds[stageIndex] !== stageId)
    ) {
      errors.push(`${label} stages must be: ${expectedStageIds.join(", ")}`);
    }

    for (const stage of attempt.stages) {
      if (!isRecord(stage)) {
        errors.push(`${label} contains an invalid stage`);
        continue;
      }

      const expectedKind = stage.id === "core" ? "core" : "follow-up";

      if (stage.kind !== expectedKind) {
        errors.push(`${label} stage ${stage.id} kind must be ${expectedKind}`);
      }

      if (!isNonEmptyString(stage.title)) {
        errors.push(`${label} stage ${stage.id} title must be non-empty`);
      }

      if (!STAGE_STATUSES.has(stage.status)) {
        errors.push(`${label} stage ${stage.id} status is invalid: ${stage.status}`);
      }

      if (stage.adaptation !== null && !isNonEmptyString(stage.adaptation)) {
        errors.push(`${label} stage ${stage.id} adaptation must be null or non-empty`);
      }

      if (stage.status === "skipped") {
        if (!isNonEmptyString(stage.skipReason)) {
          errors.push(`${label} skipped stage ${stage.id} requires skipReason`);
        }
      } else if (stage.skipReason !== null) {
        errors.push(`${label} stage ${stage.id} skipReason must be null unless skipped`);
      }

      if (stage.status === "completed") {
        validateCheckpoint(stage.checkpoint, stage.id, topicIds, errors);
      } else if (stage.checkpoint !== null) {
        errors.push(`${label} stage ${stage.id} checkpoint requires completed status`);
      }
    }

    if (
      attempt.activeStageId !== null &&
      !stageIds.has(attempt.activeStageId)
    ) {
      errors.push(`${label} activeStageId references an unknown stage`);
    }

    if (!Array.isArray(attempt.coachEvents)) {
      errors.push(`${label} coachEvents must be an array`);
    } else {
      const coachIds = new Set();

      for (const event of attempt.coachEvents) {
        if (!isRecord(event) || !isNonEmptyString(event.id)) {
          errors.push(`${label} has an invalid coach event`);
          continue;
        }

        if (coachIds.has(event.id)) {
          errors.push(`${label} coach event id is duplicated: ${event.id}`);
        }
        coachIds.add(event.id);

        if (!isTimestamp(event.createdAt)) {
          errors.push(`${label} coach event ${event.id} createdAt is invalid`);
        }

        if (!stageIds.has(event.stageId)) {
          errors.push(`${label} coach event ${event.id} references unknown stage`);
        }

        if (!topicIds.has(event.topicId)) {
          errors.push(`${label} coach event ${event.id} references unknown topic`);
        }

        if (!Number.isInteger(event.level) || event.level < 1 || event.level > 5) {
          errors.push(`${label} coach event ${event.id} level must be from 1 to 5`);
        }

        if (!COACH_MODES.has(event.mode)) {
          errors.push(`${label} coach event ${event.id} mode is invalid`);
        }
      }
    }

    if (attempt.review !== null) {
      validateStructuredReview(attempt.review, stageIds, topicIds, errors, label);
    }

    if (attempt.status === "reviewed" && attempt.review === null) {
      errors.push(`${label} reviewed status requires structured review`);
    }

    if (
      ["ready", "in-progress", "ready-for-review", "abandoned"].includes(
        attempt.status,
      ) &&
      attempt.review !== null
    ) {
      errors.push(`${label} status ${attempt.status} cannot contain review data`);
    }
  }

  if (!attemptIds.has(session.activeAttemptId)) {
    errors.push("session.json activeAttemptId references an unknown attempt");
  }

  if (session.activeAttemptId !== session.attempts.at(-1)?.id) {
    errors.push("session.json activeAttemptId must reference the latest attempt");
  }
}

function validateReviewFile(record, errors) {
  const activeAttempt = getActiveAttempt(record.session);

  if (!record.reviewSource) {
    if (activeAttempt?.status === "reviewed") {
      errors.push("review.md is required when the active attempt is reviewed");
    }
    return;
  }

  if (firstNonEmptyLine(record.reviewSource) !== "# Task Review") {
    errors.push('review.md must start with "# Task Review"');
  }

  for (const section of REQUIRED_REVIEW_SECTIONS) {
    if (!new RegExp(`^## ${section}$`, "m").test(record.reviewSource)) {
      errors.push(`review.md missing required section: ${section}`);
    }
  }

  const mastery = parseReviewMastery(record.reviewSource);
  const verdict = parseReviewVerdict(record.reviewSource);

  if (!mastery) {
    errors.push("review.md Mastery must include a valid Level and Reason");
  } else if (mastery.label !== MASTERY_LABELS[mastery.level]) {
    errors.push(
      `review.md Mastery label for ${mastery.level}/5 must be "${MASTERY_LABELS[mastery.level]}"`,
    );
  }

  if (!verdict) {
    errors.push("review.md Requirement check must include yes, partially, or no");
  }

  if (activeAttempt?.status !== "reviewed" || !activeAttempt.review) {
    errors.push("review.md requires the active session attempt to be reviewed");
    return;
  }

  if (
    mastery &&
    (mastery.level !== activeAttempt.review.mastery.level ||
      mastery.label !== activeAttempt.review.mastery.label ||
      mastery.reason !== activeAttempt.review.mastery.reason)
  ) {
    errors.push("review.md Mastery must match session.json structured review");
  }

  if (verdict && verdict !== activeAttempt.review.requirementVerdict) {
    errors.push("review.md requirement verdict must match session.json structured review");
  }
}

async function validateTask(task, topicIds) {
  const errors = [];
  const requiredFiles = ["task.md", "interviewer.md", "session.json"];

  for (const fileName of requiredFiles) {
    if (!(await fileExists(path.join(task.dir, fileName)))) {
      errors.push(`missing ${fileName}`);
    }
  }

  if (errors.length > 0) {
    return errors;
  }

  let record;

  try {
    record = await readTaskRecord(task);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    return errors;
  }

  validateTaskFrontmatter(record, errors);
  await validateTaskFiles(record, errors);
  validateInterviewer(record, topicIds, errors);
  validateSession(record, topicIds, errors);
  validateReviewFile(record, errors);

  return errors;
}

async function main() {
  const allErrors = [];
  let catalog;

  try {
    catalog = await readTopicCatalog();
  } catch (error) {
    console.error(
      `Task validation failed:\n- data/topic-catalog.json\n  - ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    process.exit(1);
  }

  const catalogErrors = validateTopicCatalog(catalog);

  if (catalogErrors.length > 0) {
    allErrors.push({ target: "data/topic-catalog.json", errors: catalogErrors });
  }

  const topicIds = new Set(
    Array.isArray(catalog.topics) ? catalog.topics.map((topic) => topic.id) : [],
  );
  const taskDirs = await collectTaskDirs();
  const seenSlugs = new Set();

  for (const task of taskDirs) {
    const errors = await validateTask(task, topicIds);

    if (seenSlugs.has(task.slug)) {
      errors.push(`duplicate slug across categories: ${task.slug}`);
    }
    seenSlugs.add(task.slug);

    if (errors.length > 0) {
      allErrors.push({
        target: path.relative(process.cwd(), task.dir),
        errors,
      });
    }
  }

  if (allErrors.length > 0) {
    console.error("Task validation failed:");
    for (const item of allErrors) {
      console.error(`- ${item.target}`);
      for (const error of item.errors) {
        console.error(`  - ${error}`);
      }
    }
    process.exit(1);
  }

  console.log(
    `Validated ${taskDirs.length} task folder(s) and ${topicIds.size} canonical topic(s).`,
  );
}

void main();
