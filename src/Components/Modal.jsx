import { useEffect } from "react";

export default function Modal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close help modal">
          ×
        </button>
        <div className="modal-body">
          <h2>About</h2>
          <p>
            Reminiscence is a simple place to explore YouTube comments through a different lens: the small moments when a song, a memory, or
            a feeling prompts someone to share a piece of their life. It is meant to celebrate the shared human experience found in the
            stories people leave behind, and to give those moments a gentle space to be discovered.
          </p>
          <h2>How to</h2>
          <p>
            Paste a valid YouTube URL to load comments. Then use the toolbar to clear the current video, shuffle the comments, or switch the
            theme mode.
          </p>
        </div>
      </div>
    </div>
  );
}
