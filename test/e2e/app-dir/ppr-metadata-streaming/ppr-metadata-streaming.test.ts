import { nextTestSetup } from 'e2e-utils'

describe('ppr-metadata-streaming', () => {
  const { next, isNextDev } = nextTestSetup({
    files: __dirname,
  })

  // No dynamic APIs used in metadata
  describe('static metadata', () => {
    // In development mode, metadata is inserted into body since it's always dynamic
    const rootSelector = isNextDev ? 'body' : 'head'
    it('should generate metadata in head when page is fully static', async () => {
      const $ = await next.render$('/fully-static')
      expect($(`${rootSelector} title`).text()).toBe('fully static')
    })

    it('should generate metadata in head when page is dynamic page content', async () => {
      const $ = await next.render$('/dynamic-page')
      expect($(`${rootSelector} title`).text()).toBe(
        'static metadata with dynamic page content'
      )
    })
  })

  // Dynamic APIs used in metadata, metadata should be suspended and inserted into body
  describe('dynamic metadata', () => {
    it('should generate metadata in head when page is fully dynamic', async () => {
      const $ = await next.render$('/fully-dynamic')
      expect($('body title').text()).toBe('fully dynamic')
    })

    it('should generate metadata in head when page content is static', async () => {
      const $ = await next.render$('/dynamic-metadata')
      expect($('body title').text()).toBe(
        'dynamic metadata with static page content'
      )
    })
  })
})
