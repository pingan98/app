import pkg from "../package.json";

export const pageDefaultTitle = import.meta.env.VITE_APP_TITLE || pkg.name;
