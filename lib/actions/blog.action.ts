export async function getAllBlogs() {
  try {
    const res = await fetch("https://dev.to/api/articles");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
