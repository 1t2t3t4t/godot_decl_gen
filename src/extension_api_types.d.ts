export interface ExtensionApi {
  header: Header
  builtin_class_sizes: BuiltinClassSize[]
  builtin_class_member_offsets: BuiltinClassMemberOffset[]
  global_constants: any[]
  global_enums: GlobalEnum[]
  utility_functions: UtilityFunction[]
  builtin_classes: BuiltinClass[]
  classes: Class[]
  singletons: Singleton[]
  native_structures: NativeStructure[]
}

export interface Header {
  version_major: number
  version_minor: number
  version_patch: number
  version_status: string
  version_build: string
  version_full_name: string
}

export interface BuiltinClassSize {
  build_configuration: string
  sizes: Size[]
}

export interface Size {
  name: string
  size: number
}

export interface BuiltinClassMemberOffset {
  build_configuration: string
  classes: MemberOffsetClass[]
}

export interface MemberOffsetClass {
  name: string
  members: Member[]
}

export interface Member {
  member: string
  offset: number
  meta: string
}

export interface BuiltinClass {
  name: string
  is_keyed: boolean
  operators: Operator[]
  constructors: Constructor[]
  has_destructor: boolean
  indexing_return_type?: string
  methods?: Method[]
  members?: Member2[]
  constants?: Constant[]
  enums?: Enum[]
}

export interface Class {
  name: string
  is_refcounted: boolean
  is_instantiable: boolean
  inherits?: string
  api_type: string
  enums?: Enum2[]
  methods?: Method2[]
  properties?: Property[]
  signals?: Signal[]
  constants?: Constant2[]
}

export interface Operator {
  name: string
  right_type?: string
  return_type: string
}

export interface Constructor {
  index: number
  arguments?: Argument2[]
}

export interface Method {
  name: string
  return_type?: string
  is_vararg: boolean
  is_const: boolean
  is_static: boolean
  hash: number
  arguments?: Argument3[]
}


export interface UtilityFunction {
  name: string
  return_type?: string
  category: string
  is_vararg: boolean
  hash: number
  arguments?: Argument[]
}

export interface Argument {
  name: string
  type: string
}

export interface Argument2 {
  name: string
  type: string
}

export interface Argument3 {
  name: string
  type: string
  default_value?: string
}

export interface Member2 {
  name: string
  type: string
}

export interface Constant {
  name: string
  type: string
  value: string
}

export interface GlobalEnum {
  name: string
  is_bitfield: boolean
  values: Value[]
}

export interface Enum {
  name: string
  values: Value[]
}

export interface Enum2 {
  name: string
  is_bitfield: boolean
  values: Value[]
}

export interface Value {
  name: string
  value: number
}

export interface Method2 {
  name: string
  is_const: boolean
  is_vararg: boolean
  is_static: boolean
  is_virtual: boolean
  hash?: number
  return_value?: ReturnValue
  arguments?: Argument4[]
}

export interface ReturnValue {
  type: string
  meta?: string
}

export interface Argument4 {
  name: string
  type: string
  default_value?: string
  meta?: string
}

export interface Property {
  type: string
  name: string
  setter?: string
  getter: string
  index?: number
}

export interface Signal {
  name: string
  arguments?: Argument5[]
}

export interface Argument5 {
  name: string
  type: string
}

export interface Constant2 {
  name: string
  value: number
}

export interface Singleton {
  name: string
  type: string
}

export interface NativeStructure {
  name: string
  format: string
}
