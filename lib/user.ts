export function getUserInfo() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || localStorage.getItem("cdt_user") || "Test";
  const type = params.get("type") || "test"; // test | basic | pro

  localStorage.setItem("cdt_user", name);
  localStorage.setItem("cdt_user_type", type);

  return {
    name,
    type,
  };
}
