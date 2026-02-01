export async function verifyPooja(
  todayImage: File,
  yesterdayImage: File
) {
  const formData = new FormData();
  formData.append("today_image", todayImage);
  formData.append("yesterday_image", yesterdayImage);

  const token = localStorage.getItem("authToken");

  const response = await fetch(
    "https://web-production-fcbc.up.railway.app/verify/",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,  // 🔐 required
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  return await response.json();
}
