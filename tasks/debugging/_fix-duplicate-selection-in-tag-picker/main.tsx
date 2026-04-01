"use client";
import { useState } from "react";

const tags = ["React", "TypeScript", "CSS", "Testing"];

export default function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag),
      );
      return;
    }

    setSelectedTags([...selectedTags, tag]);
  };

  return (
    <main>
      <h1>Tag picker</h1>

      <div style={tagListStyle}>
        {tags.map((tag) => (
          <button key={tag} onClick={() => toggleTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      <h2>Selected tags</h2>
      <ul>
        {selectedTags.map((tag, index) => (
          <li key={`${tag}-${index}`}>{tag}</li>
        ))}
      </ul>

      {/* TODO: fix the duplicate selection bug without rewriting the component */}
      {/* TODO: make tag clicks behave like a predictable toggle */}
      {/* TODO: keep the selected list free of duplicates */}
      {/* TODO: avoid mutating the existing state array */}
    </main>
  );
}

const tagListStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap" as const,
};
