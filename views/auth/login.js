const loginPage = () => {
  const container = document.createElement("div");

  const heading = document.createElement("h2");
  heading.innerHTML = "Login";

  container.appendChild(heading);

  return container;
};

export default loginPage;
