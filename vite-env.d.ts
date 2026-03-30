/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_VIEW_MODE: 'web' | 'mobile';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
