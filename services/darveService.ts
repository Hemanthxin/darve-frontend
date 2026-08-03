import { config } from "../src/config";

/**
 * Runs AI verification directly against the Hugging Face Space from the
 * browser (it can take up to ~120s -- too long for the backend's
 * serverless execution limit), then reports the result to the backend
 * so it can notify the admin.
 */
export async function verifyPooja(
  todayImage: File,
  yesterdayImage: File
) {
  const token = localStorage.getItem("authToken");

  const hfForm = new FormData();
  hfForm.append("today_image", todayImage);
  hfForm.append("yesterday_image", yesterdayImage);

  const hfResponse = await fetch(config.HF_VERIFY_URL, {
    method: "POST",
    body: hfForm,
  });

  if (!hfResponse.ok) {
    const err = await hfResponse.text();
    throw new Error(err);
  }

  const result = await hfResponse.json();

  const completeResponse = await fetch(
    `${config.API_BASE_URL}/verify/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        status: result.status,
        reasons: result.reasons || [],
        confidence: result.confidence,
      }),
    }
  );

  if (!completeResponse.ok) {
    const err = await completeResponse.text();
    throw new Error(err);
  }

  return result;
}
