"use client";

export default function PrintButton({ label = "PRINT THIS PAGE" }: { label?: string }) {
  return <button type="button" className="secondary" onClick={() => window.print()}>{label}</button>;
}
