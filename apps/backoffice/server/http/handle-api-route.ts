import type { ApiResponse } from "@foundjob/shared-dto";
import { NextResponse } from "next/server";
import { ApiError } from "./api-error";
import { jsonError, jsonOk } from "./api-response";

export async function handleApiRoute<TData>(action: () => Promise<ApiResponse<TData> | TData>, successStatus = 200) {
  try {
    const result = await action();
    if (result && typeof result === "object" && "ok" in result) {
      const response = result as ApiResponse<TData>;
      return NextResponse.json(response, { status: response.ok ? successStatus : 502 });
    }

    return jsonOk(result, successStatus);
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonError(error.code, error.message, error.status, error.details);
    }

    return jsonError("INTERNAL_ERROR", "Unexpected backoffice route error", 500);
  }
}
