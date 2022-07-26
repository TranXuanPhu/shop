class Guard {
  redirectToLogin(route) {
    const login = "Login";
    if (route.name != login) {
      return {
        name: login,
        replace: true,
        query: { redirect: route.fullPath },
      };
    }
  }

  redirectToHome() {
    const defaultHome = "Home";
    return { name: defaultHome, replace: true };
  }
}

export default new Guard();
