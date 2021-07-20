export type ComponentConfig = {
  componentName: string,
  props: {
    [key: string]: any,
  },
  mode?: string,
  children?: ComponentConfig[]
}
