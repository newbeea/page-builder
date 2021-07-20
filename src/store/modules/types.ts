export type ComponentConfig = {
  _currentId?: number,
  _id?: number,
  componentName: string,
  props: {
    [key: string]: any,
  },
  mode?: string,
  children?: ComponentConfig[]
}
