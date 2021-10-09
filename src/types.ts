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

export type Template = {
  thumb: string,
  preview: string,
  config: ComponentConfig,
  category: string,
  componentName: string,
  label: string,
  buildIn: boolean,
}
export type PageParameters = {
  params: {
    pageIndex: number,
  },
}
export type NewPage = {
  json: ComponentConfig,
  description: string,
  name: string,
}
