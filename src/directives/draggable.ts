import { App } from 'vue';

// function
export default {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options  lazyload options
  */
  install(app: App, options: any = {}) {
    app.directive('draggable', {
      mounted:
        (el: any, binding: any) => {
          console.log(binding.value, binding.arg);
          const mode: string = binding.arg || '';
          const config = binding.value;
          if (mode !== 'disabled') {
            if (config) {
              if (mode.includes('draggable')) {
                el.setAttribute('draggable', true);
                el.addEventListener('dragstart', (ev: DragEvent) => {
                  console.log(ev);
                  ev.cancelBubble = true;
                  ev?.dataTransfer?.setData('Text', JSON.stringify(config));
                  if (options.store) {
                    options.store.setDraggingConfig(config);
                  }
                });
              }

              // if (mode.includes('droppable')) {
              el.addEventListener('drop', (function (currentConfig) {
                // console.log(currentConfig);
                return (ev: any) => {
                  ev.preventDefault();
                  ev.cancelBubble = true;
                  const data = ev?.dataTransfer?.getData('Text');
                  const draggingConfig = JSON.parse(data);

                  console.log(currentConfig);
                  if (ev.offsetY < ev.target.offsetHeight * 0.75 && ev.offsetY > ev.target.offsetHeight * 0.25) {
                    options.store?.moveIn(currentConfig);
                  } else if (ev.offsetY >= ev.target.offsetHeight * 0.75) {
                    options.store?.move({
                      config: currentConfig,
                      direction: 'after',
                    });
                  } else {
                    options.store?.move({
                      config: currentConfig,
                      direction: 'before',
                    });
                  }

                  ev.currentTarget.style['border-top'] = 'none';
                  ev.currentTarget.style['border-bottom'] = 'none';
                };
              }(config)));
              // }
              el.addEventListener('dragover', (ev: any) => {
                ev.preventDefault();
                ev.cancelBubble = true;
                ev.stopPropagation();

                if (ev.offsetY > ev.target.offsetHeight / 2) {
                  ev.currentTarget.style['border-bottom'] = '2px solid red';
                  ev.currentTarget.style['border-top'] = 'none';
                } else {
                  ev.currentTarget.style['border-top'] = '2px solid red';
                  ev.currentTarget.style['border-bottom'] = 'none';
                }
              });
              el.addEventListener('dragenter', (ev: any) => true);
              el.addEventListener('dragleave', (ev: any) => {
                ev.currentTarget.style['border-top'] = 'none';
                ev.currentTarget.style['border-bottom'] = 'none';
              }, true);
              el.addEventListener('dragend', (ev: any) => {
                if (options.store) {
                  options.store.dragEnd();
                }
                // console.log(ev);
                // ev.currentTarget.style['border-top'] = 'none';
                // ev.currentTarget.style['border-bottom'] = 'none';
              }, true);
            }
          } else {
            el.setAttribute('draggable', false);
          }
        },
    });
  },
};
