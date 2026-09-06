import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './content-studio/importMap.js'
import './payload.scss'

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return RootLayout({
    children,
    config,
    importMap,
    serverFunction: async (args) => {
      'use server'
      return handleServerFunctions({ ...args, config, importMap })
    },
  })
}
