'use client'

import { use, type JSX } from 'react'
import { useServerInsertedMetadata } from '../../server/app-render/metadata-insertion/server-inserted-metadata'

// We need to wait for metadata on server once it's resolved, and insert into
// the HTML through `useServerInsertedMetadata`. It will suspense in <head> during SSR.
function ServerInsertMetadata({ promise }: { promise: Promise<JSX.Element> }) {
  // Apply use() to the metadata promise to suspend the rendering in SSR.
  const metadata = use(promise)
  // Pass the promise to the context to be resolved and inserted into the HTML
  useServerInsertedMetadata(() => metadata)

  return null
}

function BrowserResolvedMetadata({ promise }: { promise: Promise<any> }) {
  return use(promise)
}

export function AsyncMetadata({ promise }: { promise: Promise<any> }) {
  return (
    <>
      {typeof window === 'undefined' ? (
        <ServerInsertMetadata promise={promise} />
      ) : (
        <BrowserResolvedMetadata promise={promise} />
      )}
    </>
  )
}
