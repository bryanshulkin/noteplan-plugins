/* globals describe, expect, test, beforeAll */

// Last updated: 2.2.2023 by @jgclark

import colors from 'chalk'
import * as st from '../stringTransforms'

// TODO: Get following working if its important:
// import { DataStore /*, Note, Paragraph */ } from '@mocks/index'

// beforeAll(() => {
//   // global.Calendar = Calendar
//   // global.Clipboard = Clipboard
//   // global.CommandBar = CommandBar
//   global.DataStore = DataStore
//   // global.Editor = Editor
//   // global.NotePlan = NotePlan
//   DataStore.settings['_logLevel'] = 'DEBUG' //change this to DEBUG to get more logging
// })

const PLUGIN_NAME = `📙 ${colors.yellow('helpers/dateManipulation')}`
// const section = colors.blue

describe(`${PLUGIN_NAME}`, () => {
  /*
   * changeMarkdownLinkToHTMLLink()
   */
  describe('changeMarkdownLinkToHTMLLink()' /* function */, () => {
    test('should be empty from empty', () => {
      const result = st.changeMarkdownLinkToHTMLLink('')
      expect(result).toEqual('')
    })
    test('should be no change if no link found', () => {
      const input = 'this has [text] and (brackets) but not a valid link'
      const result = st.changeMarkdownLinkToHTMLLink(input)
      expect(result).toEqual(input)
    })
    test('should produce HTML link 1', () => {
      const input = 'this has [text](brackets) with a valid link'
      const result = st.changeMarkdownLinkToHTMLLink(input)
      expect(result).toEqual('this has <a href="brackets">text</a> with a valid link')
    })
    test('should produce HTML link 2', () => {
      const input = 'this has [title with spaces](https://www.something.com/with?various&chars%20ok) with a valid link'
      const result = st.changeMarkdownLinkToHTMLLink(input)
      expect(result).toEqual('this has <a href="https://www.something.com/with?various&chars%20ok">title with spaces</a> with a valid link')
    })
  })

  /*
   * stripBackwardsDateRefsFromString()
   */
  describe('stripBackwardsDateRefsFromString()' /* function */, () => {
    test('should be empty from empty', () => {
      const result = st.stripBackwardsDateRefsFromString('')
      expect(result).toEqual('')
    })
    test('should be no change if no date found', () => {
      const input = '- this has a bare ISO date 2023-02-02 to leave alone'
      const result = st.stripBackwardsDateRefsFromString(input)
      expect(result).toEqual(input)
    })
    test('should strip 1 back date', () => {
      const input = '- this has one back date <2023-02-02 OK?'
      const result = st.stripBackwardsDateRefsFromString(input)
      expect(result).toEqual('- this has one back date OK?')
    })
    test('should strip 2 back dates', () => {
      const input = '- this has two <2022-12-15 back dates <2023-02-02 OK?'
      const result = st.stripBackwardsDateRefsFromString(input)
      expect(result).toEqual('- this has two back dates OK?')
    })
  })

  /*
   * stripWikiLinksFromString()
   */
  describe('stripWikiLinksFromString()' /* function */, () => {
    test('should be empty from empty', () => {
      const result = st.stripWikiLinksFromString('')
      expect(result).toEqual('')
    })
    test('should be no change if no wikilinks found', () => {
      const input = '- this has a bare ISO date 2023-02-02 to leave alone'
      const result = st.stripWikiLinksFromString(input)
      expect(result).toEqual(input)
    })
    test('should strip 1 wikilink', () => {
      const input = '- this has [[one title link]] ok?'
      const result = st.stripWikiLinksFromString(input)
      expect(result).toEqual('- this has one title link ok?')
    })
    test('should strip 2 wikilink', () => {
      const input = '- this has [[one title link]] and [[another one with#heading item]] ok?'
      const result = st.stripWikiLinksFromString(input)
      expect(result).toEqual('- this has one title link and another one with#heading item ok?')
    })
  })

  /*
   * stripBlockIDsFromString()
   */
  describe('stripBlockIDsFromString()' /* function */, () => {
    test('should be empty from empty', () => {
      const result = st.stripBlockIDsFromString('')
      expect(result).toEqual('')
    })
    test('should be no change if no blockIDs found', () => {
      const input = '- this has no blockID 2023-02-02 leaves alones'
      const result = st.stripBlockIDsFromString(input)
      expect(result).toEqual(input)
    })
    test('should strip 1 blockID', () => {
      const input = '- this has one ^123def blockID'
      const result = st.stripBlockIDsFromString(input)
      expect(result).toEqual('- this has one blockID')
    })
    test('should strip 2 blockIDs', () => {
      const input = '- this has two ^123def blockIDs for some reason ^abc890'
      const result = st.stripBlockIDsFromString(input)
      expect(result).toEqual('- this has two blockIDs for some reason')
    })
    test('should not strip an invalid blockID', () => {
      const input = '- this has one ^123defa invalid blockID'
      const result = st.stripBlockIDsFromString(input)
      expect(result).toEqual('- this has one ^123defa invalid blockID')
    })

    /*
     * stripDateRefsFromString()
     */
    describe('stripDateRefsFromString()' /* function */, () => {
      test('should not strip anything', () => {
        const before = 'this has no date refs'
        const expected = before
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
      test('should strip a day', () => {
        const before = 'test >2022-01-01'
        const expected = `test`
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
      test('should strip a backwards date', () => {
        const before = 'test <2022-Q2'
        const expected = `test`
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
      test('should strip a week', () => {
        const before = 'test >2022-01 foo'
        const expected = `test foo`
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
      test('should strip a year', () => {
        const before = 'test >2022 foo'
        const expected = `test foo`
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
      test('should strip a quarter', () => {
        const before = 'test >2022-Q2'
        const expected = `test`
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
      test('should strip multiples', () => {
        const before = 'baz >2022-01 >2022-Q1 test >2022-Q2 foo >2022 >2022-01-01'
        const expected = `baz test foo`
        const result = st.stripDateRefsFromString(before)
        expect(result).toEqual(expected)
      })
    })
    /*
     * stripLinksFromString()
     */
    describe('stripLinksFromString()' /* function */, () => {
      test('should not strip anything', () => {
        const input = 'this has no links'
        const expected = input
        const result = st.stripLinksFromString(input)
        expect(result).toEqual(expected)
      })
      test('should strip a markdown link and leave the text', () => {
        const input = 'has a [link](https://example.com)'
        const expected = `has a [link]`
        const result = st.stripLinksFromString(input)
        expect(result).toEqual(expected)
      })
      test('should strip a markdown link and remove the text', () => {
        const input = 'has a [link](https://example.com)'
        const expected = `has a`
        const result = st.stripLinksFromString(input, false)
        expect(result).toEqual(expected)
      })
      test('should strip a bare link', () => {
        const input = 'bare link https://example.com'
        const expected = `bare link`
        const result = st.stripLinksFromString(input)
        expect(result).toEqual(expected)
      })
      test('should strip a np link', () => {
        const input = 'np noteplan://example.com'
        const expected = `np`
        const result = st.stripLinksFromString(input)
        expect(result).toEqual(expected)
      })
    })
  })
})
