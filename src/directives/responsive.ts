import { App } from 'vue';

export default {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options  lazyload options
  */
  install(app: App, options: any) {
    app.directive('responsive', (el: any, binding: any) => {
      if (binding.value) {
        const sizes = [360, 540, 720, 900, 1080, 1600];
        el.src = binding.value;
        el.setAttribute('data-widths', JSON.stringify(sizes));
        // el.setAttribute('data-sizes', 'auto');
        let srcset = '';
        sizes.forEach((size) => {
          srcset += `${binding.value.replace(/(\.\w+\?.*)/, `_${size}x$1 ${size}w`)}, `;
        });
        // el.setAttribute('data-srcset', srcset);
        el.setAttribute('srcset', srcset);
      }
    });
  },
};
