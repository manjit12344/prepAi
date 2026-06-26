import { useState } from "react";
import useResumeStore from "../store/04.resume.store.js";

export default function ResumeUpload() {
  const [loading, setLoading] = useState(false);

  const {
    resumeUrl,
    review,
    uploadResume,
    toServer,
  } = useResumeStore();

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      // Upload to Cloudinary
      const url = await uploadResume(file);

      // Send URL to your backend
      await toServer(url);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
      />

      {loading && <p>Uploading & Analyzing...</p>}

      {resumeUrl && (
        <>
          <h3>Resume URL</h3>

          <p style={{ wordBreak: "break-all" }}>
            {resumeUrl}
          </p>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Resume
          </a>
        </>
      )}

      {review && (
        <>
          <h3>AI Review</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {typeof review === "string"
              ? review
              : JSON.stringify(review, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}