declare type DirectiveResult = { name: string; value: string }
declare type PlatformTemplateSpecDirectiveProcessor = (...args: any[]) => boolean | DirectiveResult | DirectiveResult[]
declare type PlatformTemplateSpecDirective = Record<GlobalMode, PlatformTemplateSpecDirectiveProcessor> & {
  test: string | RegExp
}

type EventPrefixProcessor = (prefix: string, ...args: any[]) => string
type EventRuleProcessor = (eventName: string, ...args: any[]) => string | void
declare type EventRules = { test: RegExp } & Record<GlobalMode, Function>

interface PlatformTemplateEvent {
  prefix: Record<GlobalMode, EventPrefixProcessor>[]
  rules: EventRules[]
}

declare interface PlatformTemplateSpec {
  supportedModes: GlobalMode[]
  preProps: Record<GlobalMode, Function>[]
  postProps: Record<GlobalMode, Function>[]
  directive: PlatformTemplateSpecDirective[]
  event: PlatformTemplateEvent
  rules: Pick<PlatformConfig, GlobalMode | 'test' | 'waterfall'>[]

  tabBar: {
    list: ({ test: RegExp } & Record<GlobalMode, Function>)[]
    rules: ({ test: RegExp } & Record<GlobalMode, Function>)[]
  }
  window: ({ test: RegExp } & Record<GlobalMode, Function>)[]
  component: ({ test: RegExp } & Record<GlobalMode, Function>)[]
  page: ({ test: RegExp } & Record<GlobalMode, Function>)[]
  normalizeTest: (test: RegExp) => (input: string, meta: any) => boolean
}

declare type PlatformConfig = Pick<PlatformTemplateSpec, 'supportedModes'> &
  Record<GlobalMode, Function> & {
    test?: RegExp
    waterfall?: boolean

    skipNormalize?: boolean

    event?: EventRules[]
  }

type PlatformSpecProcessor = (options: { warn: Function; error: Function }) => PlatformTemplateSpec
