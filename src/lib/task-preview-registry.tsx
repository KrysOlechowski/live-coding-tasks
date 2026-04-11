import { renderTaskPreviewFromManifest } from "@/lib/generated-task-preview-manifest";

export function renderTaskPreview(slug: string) {
  return renderTaskPreviewFromManifest(slug);
}
