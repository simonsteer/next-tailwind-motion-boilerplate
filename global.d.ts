declare module 'updeep' {
  export default <T extends {}>(updates: DeepPartial<T>, target: T) => T
}

declare module 'classnames' {
  export default (
    ...classNames: (
      | string
      | null
      | false
      | undefined
      | { [className: string]: string | null | false | undefined }
    )[]
  ) => string
}

declare type ValueInObject<K extends {}> = K[keyof K]

declare type DeepPartial<K extends {}> = Partial<
  {
    [Key in keyof K]: K[Key] extends any[]
      ? K[Key]
      : K[Key] extends {}
      ? DeepPartial<K[Key]>
      : K[Key]
  }
>
