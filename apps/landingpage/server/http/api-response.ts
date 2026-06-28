import { NextResponse } from "next/server";

export function jsonOk<TData>(data: TData, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonError(code: string, message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: { code, message, details } }, { status });
}
