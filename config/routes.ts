export const routes = {
  public: {
    home: "/",

    about: "/haqqimizda",

    contact: "/elaqe",

    search: "/axtaris",

    podcasts: "/podcast",

    projects: "/layihe",
  },

  admin: {
    dashboard: "/admin",

    login: "/admin/login",

    articles: "/admin/articles",

    createArticle:
      "/admin/articles/create",

    categories:
      "/admin/categories",

    createCategory:
      "/admin/categories/create",

    tags: "/admin/tags",

    createTag:
      "/admin/tags/create",

    podcasts: "/admin/podcasts",

    createPodcast:
      "/admin/podcasts/create",

    users: "/admin/users",

    createUser:
      "/admin/users/create",

    media: "/admin/media",

    settings: "/admin/settings",

    contactRequests:
      "/admin/contact-requests",
  },
} as const;