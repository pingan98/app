import { createPinia } from "pinia";
import presist from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(presist);

export { store };
