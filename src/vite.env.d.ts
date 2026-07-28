/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SPORTS_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
