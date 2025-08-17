export const getWelcomeMessage = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/welcome');
    return await response.json();
  } catch (err) {
    console.error("API fetch error:", err);
    return { message: "Error fetching data" };
  }
};
