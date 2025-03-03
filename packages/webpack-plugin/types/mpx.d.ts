type GlobalMode = LiteralUnion<'ali' | 'swan' | 'qq' | 'tt' | 'web' | 'qa' | 'jd' | 'dd' | 'ios' | 'android'>
type TemplateType = LiteralUnion<'template' | 'script' | 'json' | 'style'>

type MpxJsonConfig = {
  pages: (string | { src: string; path: string })[]
  usingComponents: Record<string, string>
  packages: string[]
  subPackages: { root: string; tarRoot: string; srcRoot: string; pages: MpxJsonConfig['pages'] }[]
  componentGenerics: any
  tabBar: {
    list: { pagePath: string }[]
    borderStyle: string
    position: string
    custom: boolean
    isShow: boolean
  }
}

interface MpxParserBlock {
  tag: any
  content: string
  start: any
  attrs: any
}

interface MpxParserResult {
  template?: TemplateParserTag
  script?: TemplateParserTag
  json?: TemplateParserTag
  styles?: Array<TemplateParserTag>
  customBlocks: Array<TemplateParserTag>
}

type MpxModuleType = 'page' | 'component' | 'app'

type TemplateParserTag = {
  tag: string
  attrs: Record<string, string>
  start: number
  end: number
  content: string
  pririty?: number

  mode?: GlobalMode
}

interface MpxConfig {
  event?: {
    parseEvent: () => void
    getEvent: (eventName: string, prefix: string) => void
    defaultModelEvent: string
    defaultModelProp: string
    defaultModelValuePath: string
  }
  wxs: {
    tag: string
    module: string
    src: string
    ext: string
    templatePrefix: string
  }
  typeExtMap?: Record<string, string>
  tabBar?: Record<string, string>
  directive: Record<string, string>
  optionMenu?: Record<string, string>
  eventProxyIgnoreTagArr?: string[]
}
