class Router {
  constructor() {
    this.routes = {};

    this.appElement = document.querySelector("#app");

    window.addEventListener("onpopstate", (event) => {
      const route = location.pathname;
      this.render(route);
    });
  }

  create(routeName, linkLabel, viewFunction) {
    this.routes[routeName] = {
      linkLabel: linkLabel,
      view: viewFunction,
    };
  }

  delete(routeName) {
    delete this.routes[routeName];
  }

  navigate(event) {
    const route = event.target.pathname;
    history.pushState({}, "", route); // adding to history stack.
    this.render(route);
  }

  render(route) {
    const routeData = this.routes[route];

    if (!routeData) {
      this.appElement.innerHTML = "404 - error";
      return;
    }
    this.appElement.innerHTML = ``;
    this.appElement.appendChild(this.routes[route].view());
  }

  get() {
    return this.routes;
  }
}

export default Router;
