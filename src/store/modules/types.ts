export type ComponentConfig = {
  _currentId?: number,
  _id?: number,
  _active?: boolean,
  _props?: any,
  name?: string,
  componentName: string,
  props: {
    [key: string]: any,
  },
  mode?: string,
  children?: ComponentConfig[],
  slots?: ComponentConfig[],
  css?: string,
  fonts?: string[],
}
