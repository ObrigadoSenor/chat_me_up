interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_SERVER_PORT: number;
  readonly VITE_AUTH_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
