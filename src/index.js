import User from "../js/models/User.js";
import Router from "../js/utils/Router.js";
import loginPage from "../views/auth/login.js";
import registerPage from "../views/auth/register.js";

const navElement = document.querySelector("#nav");
const appElement = document.querySelector("#app");

const router = new Router();
const routes = router.get();

router.create("/login", "Login", loginPage);
router.create("/register", "Register", registerPage);

const renderNavLinks = () => {
  const navFragment = document.createDocumentFragment();

  Object.keys(routes).forEach((route) => {
    const { linkLabel } = routes[route];
    const linkElement = document.createElement("a");
    linkElement.href = route;
    linkElement.textContent = linkLabel;

    navFragment.append(linkElement);
  });

  navElement.append(navFragment);
};

const registerNavLinks = () => {
  navElement.addEventListener("click", (event) => {
    event.preventDefault();
    router.navigate(event);
  });
};

(function boot() {
  renderNavLinks();
  registerNavLinks();

  router.render(location.pathname);
})();
