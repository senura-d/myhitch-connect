"use client";

import * as React from "react";
import { IconUpload, IconFile, IconX, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "done";
}

export function FileUpload({
  accept,
  multiple = true,
  maxSizeMb = 10,
  onFilesChange,
  className,
  label = "Drag and drop files here, or click to browse",
  hint,
}: {
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  onFilesChange?: (files: UploadedFile[]) => void;
  className?: string;
  label?: string;
  hint?: string;
}) {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timers = React.useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  React.useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((t) => clearInterval(t));
    };
  }, []);

  const addFiles = React.useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted = Array.from(incoming).filter((f) => f.size <= maxSizeMb * 1024 * 1024);
      const newEntries: UploadedFile[] = accepted.map((file) => ({
        id: `${file.name}-${file.size}-${Math.round(performance.now())}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        progress: 0,
        status: "uploading",
      }));

      setFiles((prev) => {
        const next = multiple ? [...prev, ...newEntries] : newEntries;
        onFilesChange?.(next);
        return next;
      });

      newEntries.forEach((entry) => {
        const timer = setInterval(() => {
          setFiles((prev) => {
            const next = prev.map((f) => {
              if (f.id !== entry.id || f.status === "done") return f;
              const progress = Math.min(100, f.progress + 20 + Math.random() * 15);
              return progress >= 100 ? { ...f, progress: 100, status: "done" as const } : { ...f, progress };
            });
            const updated = next.find((f) => f.id === entry.id);
            if (updated?.status === "done") {
              clearInterval(timer);
              timers.current.delete(entry.id);
            }
            onFilesChange?.(next);
            return next;
          });
        }, 250);
        timers.current.set(entry.id, timer);
      });
    },
    [maxSizeMb, multiple, onFilesChange]
  );

  const removeFile = (id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearInterval(timer);
      timers.current.delete(id);
    }
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      onFilesChange?.(next);
      return next;
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors",
          isDragging ? "border-primary bg-accent" : "border-border hover:bg-muted/50"
        )}
      >
        <IconUpload className="size-6 text-muted-foreground" stroke={1.5} />
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
            >
              <IconFile className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{f.file.name}</p>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      f.status === "done" ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
              </div>
              {f.status === "done" ? (
                <IconCheck className="size-4 shrink-0 text-success" />
              ) : (
                <span className="w-8 shrink-0 text-right text-xs text-muted-foreground">
                  {Math.round(f.progress)}%
                </span>
              )}
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                aria-label={`Remove ${f.file.name}`}
                className="shrink-0 rounded-xs text-muted-foreground hover:text-foreground"
              >
                <IconX className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
