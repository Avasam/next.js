import { renderToReadableStream } from 'react-dom/server.edge'
import {
  ServerInsertedMetadataContext,
  type MetadataResolver,
} from '../../../shared/lib/server-inserted-metadata-context.shared-runtime'
import { renderToString } from '../render-to-string'

export function createServerInsertedMetadata() {
  let metadataResolver: MetadataResolver | null = null
  let setMetadataResolver = (resolver: MetadataResolver): void => {
    metadataResolver = resolver
  }

  return {
    ServerInsertedMetadataProvider: ({
      children,
    }: {
      children: React.ReactNode
    }) => {
      return (
        <ServerInsertedMetadataContext.Provider value={setMetadataResolver}>
          {children}
        </ServerInsertedMetadataContext.Provider>
      )
    },

    async getServerInsertedMetadata(): Promise<string> {
      // resolver is not passed from hook to context yet
      if (metadataResolver === null) {
        return ''
      }

      const metadata = metadataResolver()
      const metadataHtml = await renderToString({
        renderToReadableStream,
        element: metadata,
      })
      return metadataHtml
    },
  }
}
