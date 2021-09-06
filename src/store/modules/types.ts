export type ComponentConfig = {
  _currentId?: number,
  _id?: number,
  _active?: boolean,
  componentName: string,
  props: {
    [key: string]: any,
  },
  mode?: string,
  children?: ComponentConfig[],
  slots?: ComponentConfig[],
  customCss?: string,
}
