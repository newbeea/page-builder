import { App } from 'vue';

let lastHighlight: HTMLElement;
// function
export default {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options  lazyload options
  */
  install(app: App, options: any = {}) {
    app.directive('selectable', {
      mounted:
        (el: any, binding: any) => {
          const config = binding.value;
          el.addEventListener('click', (ev: any) => {
            console.log(ev);
            ev.stopPropagation();
            ev.cancelBubble = true;
            options.store?.setActiveConfig(config);
            // if (lastHighlight) {
            //   lastHighlight.style.outline = '1px dotted #ffd04b';
            //   lastHighlight.style['outline-offset'] = '-1px';
            // }
            // ev.currentTarget.style.outline = '2px solid red';
            // ev.currentTarget.style['outline-offset'] = '-2px';
            // lastHighlight = ev.currentTarget;
          });
        },
    });
  },
};
