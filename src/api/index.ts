import axios, { AxiosPromise } from 'axios';
import { ComponentConfig } from '@/store/modules/types';
import {
  NewPage, PageParameters, Template,
} from '@/types';
import { Request } from './request';

export function getPanels(): AxiosPromise<any> {
  return Request({
    url: '/panels',
    method: 'get',
  });
}
export function createPanel(panel: any): AxiosPromise<any> {
  return Request.post('/panels', panel);
}

export function getComonents(): AxiosPromise<any> {
  return Request({
    url: '/components',
    method: 'get',
  });
}

export function createComponent(component: any): AxiosPromise<any> {
  return Request.post('/components', component);
}

export function getPage(id: string): AxiosPromise<any> {
  return Request.get(`/pages/${id}`);
}

export function getPages(params: PageParameters): AxiosPromise<any> {
  return Request.get('/pages', params);
}

export function createPage(page: NewPage): AxiosPromise<any> {
  return Request.post('/pages', page);
}

export function savePage(id: string, page: {
  json: ComponentConfig
}): AxiosPromise<any> {
  return Request.post(`/pages/${id}`, page);
}

export function getCode(schema: {
  json: ComponentConfig,
  dslType: string,
}): AxiosPromise<any> {
  return Request.post('/code', schema);
}

export function createTemplate(template: Template): AxiosPromise<any> {
  return Request.post('/template', {
    component: template,
  });
}

export function addFont(font: any): AxiosPromise<any> {
  return Request.post('/fonts', font);
}

export function getFonts(): AxiosPromise<any> {
  return Request.get('/fonts');
}
export function getLibs(): AxiosPromise<any> {
  return Request.get('/libs');
}
