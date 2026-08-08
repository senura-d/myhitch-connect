/** A column definition: the header text and how to pull the value off a row. */
export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
}

/**
 * Escapes a single CSV field.
 *
 * Two separate concerns:
 * 1. CSV syntax — wrap in quotes and double any embedded quotes.
 * 2. Formula injection — a field starting with = + - @ (or tab/CR) is executed
 *    as a formula when the file is opened in Excel or Sheets. Prefixing with a
 *    single quote neutralises it. Exports are the classic vector for this.
 */
function escapeField(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '""';

  let text = String(input);

  if (/^[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

/** Builds a CSV document (header row + data rows) from typed columns. */
export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((c) => escapeField(c.header)).join(",");
  const body = rows.map((row) =>
    columns.map((c) => escapeField(c.value(row))).join(",")
  );
  return [header, ...body].join("\r\n");
}

/**
 * Triggers a browser download for the given CSV text.
 * The BOM makes Excel read it as UTF-8 rather than the system codepage.
 */
export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([`﻿${csv}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release the blob once the click has been handled.
  URL.revokeObjectURL(url);
}

/** `myhitch-bookings-2026-08-08.csv` */
export function timestampedFilename(base: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `myhitch-${base}-${date}.csv`;
}
