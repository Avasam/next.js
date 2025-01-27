'use client'

import { useContext } from 'react'

import {
  ServerInsertedMetadataContext,
  type MetadataResolver,
} from '../../../shared/lib/server-inserted-metadata-context.shared-runtime'

// Receives a metadata resolver setter from the context, and will pass the metadata resolving promise to
// the context where we gonna use it to resolve the metadata, and render as string to append in <body>.
export const useServerInsertedMetadata = (
  metadataResolver: MetadataResolver
) => {
  const setMetadataResolver = useContext(ServerInsertedMetadataContext)

  if (typeof setMetadataResolver === 'function') {
    setMetadataResolver(metadataResolver)
  }
}
