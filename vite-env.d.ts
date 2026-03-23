/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VIEW_MODE: 'web' | 'mobile';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
