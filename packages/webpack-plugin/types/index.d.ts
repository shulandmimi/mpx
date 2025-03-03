import type { Dependency, EntryPlugin, LoaderContext as ILoaderContext } from 'webpack'

declare module 'webpack' {
  interface Compiler {
    __mpx__?: boolean
  }
  interface Compilation {
    __mpx__?: MpxPluginInstance
  }

  interface NormalModule {
    buildInfo: {
      assetsInfo: Map<string, any>
    }
  }
}

type FilterCondition = string | RegExp | (string | RegExp)[]

declare global {
  type LiteralUnion<T extends string> = T | (string & {})

  interface LoaderContext<T = any> extends ILoaderContext<T> {
    getMpx: () => MpxPluginInstance
  }

  interface TransformRpxOptions {
    mode: 'all' | 'only' | 'except'
    include?: FilterCondition
    exclude?: FilterCondition
    comment?: string
  }

  interface TransformMpxOptions {
    mode: 'all' | 'only' | 'except'
    include?: Condition
    exclude?: Condition
    comment?: string
  }

  interface I18nOption {
    locale: string
    messagesPath: string
    useComputed: boolean
  }

  interface SubpackagePlaceholder {
    name: string
    resource: string
  }

  interface SubpackageOption {
    include: string
    root: string
    placeholder: string | SubpackagePlaceholder
  }

  type HackResolveBuildDependenciesOption = (options: { files: Set<string>; resolveDependencies: { files: Set<string> } }) => void

  interface MpxPluginOption {
    subpackageModulesRules: {
      include: Condition
    }
    pathHashMode: 'relative'
    generateBuildMap: string | boolean
    dynamicRuntime: boolean
    partialCompile: {
      include: Condition
    }
    partialCompileRules: {
      include: Condition
    }
    /**
     * 检测哪些再模板中未引用的组件
     */
    checkUsingComponents: boolean
    writeMode: 'full' | 'changed'
    /**
     * 强制输出到主包公用
     */
    forceMainPackageRules: {
      include: Condition
    }
    modeRules: any
    /**
     * 开启后可优化编译配置减少构建产物体积
     */
    optimizeSize: boolean
    customComponentModuleId: (path: string) => string
    /**
     * hack 解决 package.json 变化后缓存全量失效问题
     */
    hackResolveBuildDependencies: HackResolveBuildDependenciesOption
  }

  interface MpxPluginInstance {
    /**
     * 用于使用webpack-virtual-modules功能，目前仅输出web时下支持使用
     */
    __vfs: any
    /**
     * app信息，便于获取appName
     */
    appInfo: {}
    /**
     * pages全局记录，无需区分主包分包
     */
    pagesMap: {}
    /**
     * 组件资源记录，依照所属包进行记录
     */
    componentsMap: Record<string, Record<string, string>>
    /**
     * 静态资源(图片，字体，独立样式)等，依照所属包进行记录
     */
    staticResourcesMap: Record<string, Record<string, string>>
    /**
     * 用于记录命中subpackageModulesRules的js模块分包归属，用于js多分包冗余输出
     */
    subpackageModulesMap: Record<string, Record<string, string>>
    /**
     * 记录其他资源，如pluginMain、pluginExport，无需区分主包分包
     */
    otherResourcesMap: {}
    /**
     * 记录独立分包
     */
    independentSubpackagesMap: {}
    subpackagesEntriesMap: Record<string, import('../lib/dependencies/DynamicEntryDependency')[]>
    postSubpackageEntriesMap: Record<string, Dependency[]>
    replacePathMap: {}
    exportModules: Set<any>
    /**
     * 记录动态添加入口的分包信息
     */
    dynamicEntryInfo: {}
    /**
     * 记录entryModule与entryNode的对应关系，用于体积分析
     */
    entryNodeModulesMap: Map<any, any>
    /**
     * 记录与asset相关联的modules，用于体积分析
     */
    assetsModulesMap: Map<any, any>
    /**
     * 记录与asset相关联的ast，用于体积分析和esCheck，避免重复parse
     */
    assetsASTsMap: Map<any, any>
    globalComponents: {}
    globalComponentsInfo: {}
    /**
     * todo es6 map读写性能高于object，之后会逐步替换
     */
    wxsAssetsCache: Map<any, any>
    addEntryPromiseMap: Map<any, any>
    currentPackageRoot: string
    wxsContentMap: {}
    /**
     * qq启动该选项
     */
    forceUsePageCtor: boolean
    resolveMode: 'webpack' | 'native'
    mode: GlobalMode
    srcMode: GlobalMode
    env: GlobalMode
    externalClasses: any
    projectRoot: string
    autoScopeRules: any
    autoVirtualHostRules: {
      include: Condition
    }
    customTextRules: any
    /**
     * 是否转换wx/my等全局对象为mpx对象
     * （使用api-proxy后，调用API都应使用类似 mpx.navigateTo ，但 外部/老 代码可能是 wx.navigateTo ，就需要转换，但无脑转换可能有别的问题，通过这个精细化控制是否转换）
     */
    transRpxRules?: TransformRpxOptions[]
    postcssInlineConfig: any
    decodeHTMLText?: boolean

    /**
     * native文件专用配置
     */
    nativeConfig: {
      cssLangs: string[]
    }
    /**
     * 输出web专用配置
     */
    webConfig: any
    /**
     * 输出rn专用配置
     */
    rnConfig: any
    loaderContentCache: Map<any, any>
    tabBarMap: {}
    defs: Record<string, any>
    /**
     * 多语言i18n能力 以下是简单示例，更多详情请参考文档：https://didi.github.io/mpx/i18n.html
     */
    i18n: I18nOption
    checkUsingComponentsRules: {
      include: Condition
      exclude: Condition
    }
    forceDisableBuiltInLoader?: boolean
    appTitle: string
    attributes: any
    externals: any
    useRelativePath: any
    removedChunks: any
    forceProxyEventRules: any
    /**
     * 若配置disableRequireAsync=true, 则全平台构建不支持异步分包
     */
    supportRequireAsync: any
    partialCompileRules: any
    collectDynamicEntryInfo: Function
    asyncSubpackageRules: SubpackageOption[]
    optimizeRenderRules: ConditionOption[]
    pathHash: (resourcePath: string) => string
    addEntry: (request: string, name: string, callback: Callback) => EntryPlugin
    getModuleId: (filePath: string, isApp: boolean) => string
    getEntryNode: (module: any, type: any) => any
    getOutputPath: (resourcePath: string, type: any, options: { ext: string; conflictPath: string }) => string
    extractedFilesCache: Map<string, string>
    getExtractedFile: (resource: string, option: { error?: Function }) => string
    recordResourceMap: (params: {
      resourcePath: string
      outputPath: string
      resourceType: 'component' | 'staticResource' | 'subpackageModule'
      packageRoot: string
      recordOnly: boolean
      warn: Function
      error: Function
    }) => { outputPath: string; alreadyOutputted: boolean }
    /**
     *
     * 组件和静态资源的输出规则如下：
     * 1. 主包引用的资源输出至主包
     * 2. 分包引用且主包引用过的资源输出至主包，不在当前分包重复输出
     * 3. 分包引用且无其他包引用的资源输出至当前分包
     * 4. 分包引用且其他分包也引用过的资源，重复输出至当前分包
     */
    getPackageInfo: (params: { resource: string; resourceType: 'staticResource' | 'subpackageModule'; issuerResource: string; warn: Function; error: Function }) => {
      packageRoot: string
      packageResource: string
      packageName: string
      outputPath: string
      alreadyOutputted: boolean
    }
    /**
     * 以包为维度记录不同 package 需要的组件属性等信息，用以最终 mpx-custom-element 相关文件的输出
     */
    runtimeInfo: {}
    /**
     * 记录运行时组件依赖的运行时组件当中使用的基础组件 slot，最终依据依赖关系注入到运行时组件的 json 配置当中
     */
    dynamicSlotDependencies: {}
    /**
     * 模板引擎参数，用来检测模板引擎支持渲染的模板
     */
    dynamicTemplateRuleRunner: any
    /**
     * 依据 package 注入到 mpx-custom-element-*.json 里面的组件路径
     */
    getPackageInjectedComponentsMap: Function
    /**
     * 获取生成基础递归渲染模版的节点配置信息
     */
    getPackageInjectedTemplateConfig: Function
    injectDynamicSlotDependencies: (usingComponents: Record<string, any>, resourcePath: string) => any
    changeHashNameForAstNode: (template: string, componentsMap: Record<string, any>) => string
    collectDynamicSlotDependencies: Function
  }

  type MaybeError<E> = E | null | undefined

  interface ErrCallback<E = MaybeError<Error>, Args extends unknown[] = []> {
    (err: E, ...args: Args): void
  }

  interface Callback<Args extends unknown[] = []> extends ErrCallback<MaybeError<Error>, Args> {}

  interface JSONHelperOption {
    loaderContext: LoaderContext<any>
    emitWarning: Function
    customGetDynamicEntry: Function
  }

  type Condition = string | Function | RegExp | Condition[]
  interface ConditionOption {
    include: Condition[]
    exclude: Condition[]
    level: number
  }

  interface LoaderItem {
    loader: string
    options: any
    ident: null | string
    type: null | string
  }
}
