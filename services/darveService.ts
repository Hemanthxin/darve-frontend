export async function verifyPooja(
  todayImage: File,
  yesterdayImage: File
) {
  const formData = new FormData();
  formData.append("today_image", todayImage);
  formData.append("yesterday_image", yesterdayImage);

  const response = await fetch(
    "https://desirae-iracund-dextrosinistrally.ngrok-free.dev/verify",
    {
      method: "POST",
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  return await response.json();
}
