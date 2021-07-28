import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import * as jsonuri from 'jsonuri';
import store from '..';
import { ComponentConfig } from './types';

const img = {
  componentName: 'Image',
  props: {
    style: {
      // width: '100%',
    },
    // href: 'https://a.com',
    src: 'https://media.fameandpartners.com/product/strappy-draped-gown/preview/main/1000xAUTO/matte-satin~champagne~0.jpg',
  },
};
const config: ComponentConfig = {
  componentName: 'Page',
  id: '3a36b040-a3db-11eb-b0cf-4750e157a51a',
  props: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '420px',
      height: '871px',
      backgroundColor: '#f2f2f2',
    },
    className: 'mod',
  },
  taskId: '6C488406-D04E-47DA-B118-6236BCD221CD',
  artboardImg: 'https://img.alicdn.com/imgextra/i2/O1CN01hN1I2l1QnCj6FwgGs_!!6000000002020-2-tps-420-871.png',
  rect: {
    x: 0,
    y: 0,
    width: 420,
    height: 871,
  },
  pluginVersion: '4.0.9',
  layerProtocols: ['group'],
  name: '画板',
  reference: 'sketch',
  restore_id: '98b27d5f-3c9a-4228-a076-bcf6de526638',
  children: [{
    componentName: 'Div',
    id: '3a37739b-a3db-11eb-b0cf-4750e157a51a',
    props: {
      style: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '30px',
        backgroundColor: '#FFFFFF',
      },
      className: 'container',
    },
    rect: {
      x: 30,
      y: 30,
      width: 360,
      height: 400,
    },
    selfId: '7D852984-A1C9-4F14-BB1F-F903A1F2725F',
    children: [{
      componentName: 'Div',
      id: 'ec9b557c-9e07-488a-8141-dc7091e7f725',
      props: {
        style: {
          display: 'flex',
          position: 'relative',
          alignItems: 'flex-start',
          flexDirection: 'column',
          marginTop: '10px',
        },
        className: 'container-inner',
      },
      rect: {
        x: 40,
        y: 40,
        width: 340,
        height: 64,
      },
      smart: {
        layerProtocol: {
          group: {
            type: 'group',
          },
        },
      },
      selfId: '4491D3F6-F7A5-44A1-A685-E9FF2DD9269C',
      children: [{
        componentName: 'Div',
        id: '95bfb038-d429-415e-8e75-5002c22e1eae',
        props: {
          style: {
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '340px',
          },
          className: 'wrapper',
        },
        rect: {
          x: 40,
          y: 40,
          width: 340,
          height: 36,
        },
        children: [{
          componentName: 'Div',
          id: 'b68960fa-c336-4598-b432-5d8df61db6df',
          props: {
            style: {
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'row',
            },
            className: 'wrapper-inner',
          },
          rect: {
            x: 40,
            y: 40,
            width: 156,
            height: 36,
          },
          children: [{
            componentName: 'Image',
            id: '3a372577-a3db-11eb-b0cf-4750e157a51a',
            props: {
              style: {
                marginRight: '5px',
                width: '36px',
                height: '36px',
              },
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01BorQ3P1iFv1iyGprS_!!6000000004384-2-tps-72-72.png',
              className: 'avatar',
            },
            rect: {
              x: 40,
              y: 40,
              width: 36,
              height: 36,
            },
            selfId: '348ECD80-7002-41F7-984D-55BADF73F150',
            smart: {
              layerProtocol: {
                layout: {
                  type: 'layout',
                  position: 'left',
                },
              },
            },
          }, {
            componentName: 'Div',
            id: '4b8f6118-b3ad-46eb-8939-452a92039e26',
            props: {
              style: {
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                height: '34px',
              },
              className: 'group',
            },
            rect: {
              x: 81,
              y: 42,
              width: 115,
              height: 34,
            },
            smart: {
              layerProtocol: {
                group: {
                  type: 'group',
                },
                layout: {
                  type: 'layout',
                  position: 'right',
                },
              },
            },
            selfId: '90C49B68-F8A4-439B-A92A-A0AFEE5E17E5',
            children: [{
              componentName: 'Text',
              id: '3a372579-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  position: 'relative',
                  marginLeft: '1px',
                  maxWidth: '113px',
                  height: '16px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '16px',
                  letterSpacing: '0.10px',
                  whiteSpace: 'pre',
                  color: '#1d2129',
                  fontFamily: 'Helvetica',
                  fontSize: '12px',
                  fontWeight: 'normal',
                },
                text: 'Maximilian Güth',
                lines: 1,
                className: 'profile-name',
              },
              rect: {
                x: 82,
                y: 42,
                width: 88,
                height: 16,
              },
              selfId: '252FCF5C-88D1-4431-AD6E-4A01345B8F750',
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'top',
                  },
                },
              },
            }, {
              componentName: 'Div',
              id: '91d34155-c3c5-49a4-891e-0f3205b06985',
              props: {
                style: {
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: '2px',
                  height: '15px',
                },
                className: 'view',
              },
              rect: {
                x: 81,
                y: 60,
                width: 115,
                height: 15,
              },
              smart: {
                layerProtocol: {
                  group: {
                    type: 'group',
                  },
                  layout: {
                    type: 'layout',
                    position: 'bottom',
                  },
                },
              },
              selfId: '7082CB74-DE0C-4E91-9B61-369D32792E4D',
              children: [{
                componentName: 'Text',
                id: '3a374c80-a3db-11eb-b0cf-4750e157a51a',
                props: {
                  style: {
                    marginRight: '5px',
                    lineHeight: '11px',
                    whiteSpace: 'pre',
                    color: '#9197a3',
                    fontFamily: 'Helvetica',
                    fontSize: '11px',
                    fontWeight: 'normal',
                  },
                  text: 'Just now · Cologne ·',
                  lines: 1,
                  className: 'time-location',
                },
                rect: {
                  x: 81,
                  y: 60,
                  width: 100,
                  height: 15,
                },
                selfId: '70D6B19C-00F9-4615-AEAD-60C04A047D580',
                smart: {
                  layerProtocol: {
                    layout: {
                      type: 'layout',
                      position: 'left',
                    },
                  },
                },
              }, {
                componentName: 'Image',
                id: '3a374c81-a3db-11eb-b0cf-4750e157a51a',
                props: {
                  style: {
                    marginTop: '1px',
                    width: '10px',
                    height: '10px',
                  },
                  src: 'https://img.alicdn.com/imgextra/i3/O1CN01F7r05N1jdZ5ne2LO5_!!6000000004571-2-tps-22-22.png',
                  className: 'dot',
                },
                rect: {
                  x: 186,
                  y: 63,
                  width: 10,
                  height: 10,
                },
                selfId: '0F83DEEA-AE9C-4662-8DA7-BE25221134E5',
                smart: {
                  layerProtocol: {
                    layout: {
                      type: 'layout',
                      position: 'right',
                    },
                  },
                },
              }],
            }],
          }],
          smart: {
            layerProtocol: {
              layout: {
                type: 'layout',
                position: 'left',
              },
            },
          },
        }, {
          componentName: 'Div',
          id: '3a374c83-a3db-11eb-b0cf-4750e157a51a',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '3px',
              width: '15px',
              height: '15px',
            },
            className: 'wrapper-inner-1',
          },
          rect: {
            x: 365,
            y: 43,
            width: 15,
            height: 15,
          },
          selfId: '8D5EE1EE-DF9D-4814-BC31-08EA14CB530F',
          children: [{
            componentName: 'Image',
            id: '3a374c82-a3db-11eb-b0cf-4750e157a51a',
            props: {
              style: {
                width: '13px',
                height: '3px',
              },
              src: 'https://img.alicdn.com/imgextra/i1/O1CN01NlbSkZ1y1IEQye4Ho_!!6000000006518-2-tps-26-6.png',
              className: 'icon-more',
            },
            rect: {
              x: 366,
              y: 49,
              width: 13,
              height: 3,
            },
            selfId: 'C9C09DD5-D502-4A3C-887C-9EAFC694877E',
          }],
          smart: {
            layerProtocol: {
              layout: {
                type: 'layout',
                position: 'right',
              },
            },
          },
        }],
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'top',
            },
          },
        },
      }, {
        componentName: 'Text',
        id: '3a374c84-a3db-11eb-b0cf-4750e157a51a',
        props: {
          style: {
            position: 'relative',
            marginTop: '10px',
            maxWidth: '340px',
            height: '18px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '18px',
            whiteSpace: 'pre',
            color: '#1d2129',
            fontFamily: 'Helvetica',
            fontSize: '14px',
            fontWeight: 'normal',
          },
          text: 'This looks awesome!',
          lines: 1,
          className: 'post',
        },
        rect: {
          x: 40,
          y: 86,
          width: 131,
          height: 18,
        },
        selfId: 'B7FF1981-AFC5-49E4-BE2F-E4FC30136D150',
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'bottom',
            },
          },
        },
      }],
    }, {
      componentName: 'Image',
      id: '3a374c85-a3db-11eb-b0cf-4750e157a51a',
      props: {
        style: {
          position: 'relative',
          marginTop: '10px',
          width: '340px',
          height: '170px',
        },
        src: 'https://img.alicdn.com/imgextra/i4/O1CN015y5xo31rUsVQub5Iz_!!6000000005635-2-tps-680-340.png',
        className: 'layer',
      },
      rect: {
        x: 40,
        y: 114,
        width: 340,
        height: 170,
      },
      selfId: '745D85A7-90E6-4E49-9634-FAF08D5CD9B3',
    }, {
      componentName: 'Div',
      id: '3a374c89-a3db-11eb-b0cf-4750e157a51a',
      props: {
        style: {
          display: 'flex',
          position: 'relative',
          alignItems: 'flex-start',
          flexDirection: 'column',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05)',
          borderStyle: 'solid',
          borderColor: '#EAEAEA',
          backgroundColor: '#FFFFFF',
          width: '340px',
          height: '65px',
          color: '#1d2129',
          fontWeight: 'normal',
          lineHeight: '16px',
          whiteSpace: 'pre',
        },
        className: 'container-inner-1',
      },
      rect: {
        x: 40,
        y: 284,
        width: 340,
        height: 65,
      },
      selfId: 'B00934EC-4270-4A8E-85DA-234D6577BA3B',
      children: [{
        componentName: 'Text',
        id: '3a374c86-a3db-11eb-b0cf-4750e157a51a',
        props: {
          style: {
            position: 'relative',
            marginTop: '13px',
            marginLeft: '10px',
            maxWidth: '320px',
            height: '16px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.20px',
            fontFamily: 'Helvetica',
            fontSize: '12px',
          },
          text: 'Super awesome cheese toast!',
          lines: 1,
          className: 'title',
        },
        rect: {
          x: 50,
          y: 297,
          width: 167,
          height: 16,
        },
        selfId: '28061537-1C80-462B-BF95-1BE0C5F56D120',
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'top',
            },
          },
        },
      }, {
        componentName: 'Text',
        id: '3a374c87-a3db-11eb-b0cf-4750e157a51a',
        props: {
          style: {
            position: 'relative',
            marginLeft: '10px',
            maxWidth: '320px',
            height: '16px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'Helvetica',
            fontSize: '12px',
          },
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
          lines: 1,
          className: 'excerpt',
        },
        rect: {
          x: 50,
          y: 313,
          width: 294,
          height: 16,
        },
        selfId: 'CB086D13-89D2-4A24-8854-A7A3641575F50',
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'middle',
            },
          },
        },
      }, {
        componentName: 'Text',
        id: '3a374c88-a3db-11eb-b0cf-4750e157a51a',
        props: {
          style: {
            position: 'relative',
            marginTop: '-2px',
            marginLeft: '10px',
            maxWidth: '320px',
            height: '15px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '15px',
            whiteSpace: 'nowrap',
            color: '#90949c',
            fontFamily: 'Helvetica',
            fontSize: '11px',
          },
          text: 'grandcentrix.net',
          lines: 1,
          className: 'source',
        },
        rect: {
          x: 50,
          y: 327,
          width: 79,
          height: 15,
        },
        selfId: '06999AC1-71FD-4166-B2EB-C5E5EC6C28DA0',
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'bottom',
            },
          },
        },
      }],
    }, {
      componentName: 'Div',
      id: '3a37739a-a3db-11eb-b0cf-4750e157a51a',
      props: {
        style: {
          display: 'flex',
          position: 'relative',
          alignItems: 'flex-start',
          flexDirection: 'column',
        },
        className: 'container-inner-2',
      },
      rect: {
        x: 30,
        y: 349,
        width: 360,
        height: 81,
      },
      selfId: 'E49CEC2A-55AE-40F9-BBBA-2C7AE3347096',
      children: [{
        componentName: 'Div',
        id: '09535b8b-5e4e-4c62-aac1-4149a0b3aa0d',
        props: {
          style: {
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-start',
            flexDirection: 'column',
            height: '43px',
          },
          className: 'wrapper-1',
        },
        rect: {
          x: 30,
          y: 349,
          width: 360,
          height: 43,
        },
        children: [{
          componentName: 'Div',
          id: 'dbddb90d-dd97-4fbd-a013-adb1f5cf960f',
          props: {
            style: {
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: '14px',
              marginLeft: '11px',
              height: '15px',
            },
            className: 'wrapper-inner-2',
          },
          rect: {
            x: 41,
            y: 363,
            width: 82,
            height: 15,
          },
          children: [{
            componentName: 'Image',
            id: '3a374c8a-a3db-11eb-b0cf-4750e157a51a',
            props: {
              style: {
                marginTop: '-1px',
                marginRight: '4px',
                width: '14px',
                height: '14px',
              },
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01rGWj0E1ZTM6WXnLnX_!!6000000003195-2-tps-28-28.png',
              className: 'icon',
            },
            rect: {
              x: 41,
              y: 363,
              width: 14,
              height: 14,
            },
            selfId: '2883761A-3D44-4BB1-BBDA-B4AB04FABBCD',
            smart: {
              layerProtocol: {
                layout: {
                  type: 'layout',
                  position: 'left',
                },
              },
            },
          }, {
            componentName: 'Text',
            id: '3a374c8b-a3db-11eb-b0cf-4750e157a51a',
            props: {
              style: {
                lineHeight: '11px',
                whiteSpace: 'pre',
                color: '#1d2129',
                fontFamily: 'Helvetica',
                fontSize: '11px',
                fontWeight: 'normal',
              },
              text: 'Chuck Norris',
              lines: 1,
              className: 'friends',
            },
            rect: {
              x: 59,
              y: 363,
              width: 64,
              height: 15,
            },
            selfId: 'FEAC785D-6E96-4EB4-9B96-6472200E78760',
            smart: {
              layerProtocol: {
                layout: {
                  type: 'layout',
                  position: 'right',
                },
              },
            },
          }],
          smart: {
            nodeIdentification: {
              baseComponent: ['countdown'],
            },
            nodeCustom: {
              baseComponent: {
                isConfident: true,
                label: 'countdown',
                score: 1,
                type: 'baseComponent',
                meta: {
                  threshold: 0.99,
                },
                rect: {
                  x: 41,
                  y: 363,
                  width: 82,
                  height: 15,
                },
                id: 'dbddb90d-dd97-4fbd-a013-adb1f5cf960f',
                selfId: null,
              },
            },
            layerProtocol: {
              component: {
                type: 'countdown',
              },
            },
          },
        }],
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'top',
            },
          },
        },
      }, {
        componentName: 'Div',
        id: '645246dd-d39c-4890-9cab-29ef4eb2ddd5',
        props: {
          style: {
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '2px',
            width: '360px',
            height: '36px',
          },
          className: 'wrapper-2',
        },
        rect: {
          x: 30,
          y: 394,
          width: 360,
          height: 36,
        },
        children: [{
          componentName: 'Image',
          id: '3a377390-a3db-11eb-b0cf-4750e157a51a',
          props: {
            style: {
              position: 'relative',
              marginTop: '-2px',
              width: '340px',
              height: '2px',
            },
            src: 'https://img.alicdn.com/imgextra/i2/O1CN0127aVsV1GkK4pAs8zU_!!6000000000660-2-tps-680-4.png',
            className: 'bg',
          },
          rect: {
            x: 40,
            y: 392,
            width: 340,
            height: 2,
          },
          selfId: '6A367C23-2250-4D72-B4C2-C76B4A13D706',
          smart: {
            layerProtocol: {
              layout: {
                type: 'layout',
                position: 'top',
              },
              component: {
                type: 'progressbar',
              },
            },
            nodeIdentification: {
              baseComponent: ['progressbar'],
            },
            nodeCustom: {
              baseComponent: {
                isConfident: true,
                label: 'progressbar',
                score: 0.9989091157913208,
                type: 'baseComponent',
                meta: {
                  threshold: 0.99,
                },
                rect: {
                  x: 40,
                  y: 392,
                  width: 340,
                  height: 2,
                },
                id: '3a377390-a3db-11eb-b0cf-4750e157a51a',
                selfId: '6A367C23-2250-4D72-B4C2-C76B4A13D706',
              },
            },
          },
        }, {
          componentName: 'Div',
          id: '37441839-900f-493e-b1d4-923e64dcff03',
          props: {
            style: {
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: '6px',
            },
            className: 'wrapper-inner-3',
          },
          rect: {
            x: 65,
            y: 400,
            width: 291,
            height: 20,
          },
          children: [{
            componentName: 'Div',
            id: 'd29c90d8-b10d-4f7d-acf5-f4d09085c00f',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginRight: '62px',
              },
              className: 'group-i0',
            },
            rect: {
              x: 65,
              y: 400,
              width: 45,
              height: 20,
            },
            children: [{
              componentName: 'Div',
              id: '3a377392-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: '4px',
                  width: '20px',
                  height: '20px',
                },
                className: 'icon-like-wrapper',
              },
              rect: {
                x: 65,
                y: 400,
                width: 20,
                height: 20,
              },
              selfId: '56FA3ACB-D82A-4249-9610-EA7E122BB1AC',
              children: [{
                componentName: 'Image',
                id: '3a377391-a3db-11eb-b0cf-4750e157a51a',
                props: {
                  style: {
                    marginTop: '1px',
                    width: '16px',
                    height: '15px',
                  },
                  src: 'https://img.alicdn.com/imgextra/i3/O1CN01S5F8vz23MQaQKcmuy_!!6000000007241-2-tps-34-32.png',
                  className: 'icon-like',
                },
                rect: {
                  x: 67,
                  y: 403,
                  width: 16,
                  height: 15,
                },
                selfId: '5C1E4EEF-A195-4310-B702-1F504719D81F',
                smart: {
                  nodeIdentification: {
                    fieldBind: ['house'],
                  },
                  nodeCustom: {
                    fieldBind: {
                      confidential: 0.7850053310394287,
                      isConfident: true,
                      label: 'house',
                      type: 'fieldBind',
                    },
                  },
                  layerProtocol: {
                    field: {
                      type: 'house',
                    },
                  },
                },
              }],
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'left',
                  },
                },
              },
            }, {
              componentName: 'Text',
              id: '3a377393-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  marginTop: '1px',
                  lineHeight: '11px',
                  whiteSpace: 'nowrap',
                  color: '#616770',
                  fontFamily: 'Helvetica',
                  fontSize: '11px',
                  fontWeight: 'normal',
                },
                text: 'Like',
                lines: 1,
                className: 'like',
              },
              rect: {
                x: 89,
                y: 403,
                width: 21,
                height: 15,
              },
              selfId: '1A11B859-C193-42FB-BA36-AE484A3C5FC40',
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'right',
                  },
                },
              },
            }],
            smart: {
              layerProtocol: {
                repeat: {
                  type: 'repeat',
                  repeatId: '1619144760103889',
                  repeatIndex: '0',
                },
                layout: {
                  type: 'layout',
                  position: 'left',
                },
              },
            },
          }, {
            componentName: 'Div',
            id: '7fed5ded-64bc-41d9-a60f-66f970b27296',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginRight: '57px',
              },
              className: 'group-i1',
            },
            rect: {
              x: 172,
              y: 400,
              width: 72,
              height: 20,
            },
            children: [{
              componentName: 'Div',
              id: '3a377395-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: '4px',
                  width: '20px',
                  height: '20px',
                },
                className: 'view-1',
              },
              rect: {
                x: 172,
                y: 400,
                width: 20,
                height: 20,
              },
              selfId: 'D2446B9C-3538-4DE2-9536-2DF4C096B5F2',
              children: [{
                componentName: 'Image',
                id: '3a377394-a3db-11eb-b0cf-4750e157a51a',
                props: {
                  style: {
                    width: '15px',
                    height: '16px',
                  },
                  src: 'https://img.alicdn.com/imgextra/i1/O1CN014RaC6V1fehbxfJUCi_!!6000000004032-2-tps-32-32.png',
                  className: 'icon-comment',
                },
                rect: {
                  x: 175,
                  y: 402,
                  width: 15,
                  height: 16,
                },
                selfId: '17284458-FBB1-43A8-9F6A-08FFFC8859DD',
              }],
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'left',
                  },
                },
              },
            }, {
              componentName: 'Text',
              id: '3a377396-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  marginTop: '1px',
                  lineHeight: '11px',
                  whiteSpace: 'nowrap',
                  color: '#616770',
                  fontFamily: 'Helvetica',
                  fontSize: '11px',
                  fontWeight: 'normal',
                },
                text: 'Comment',
                lines: 1,
                className: 'comment',
              },
              rect: {
                x: 196,
                y: 403,
                width: 48,
                height: 15,
              },
              selfId: '17DABD7F-71E8-4BDF-9EFA-43218B038B3B0',
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'right',
                  },
                },
              },
            }],
            smart: {
              layerProtocol: {
                repeat: {
                  type: 'repeat',
                  repeatId: '1619144760103889',
                  repeatIndex: '1',
                },
                layout: {
                  type: 'layout',
                  position: 'middle',
                },
              },
            },
          }, {
            componentName: 'Div',
            id: 'c78a03b4-de31-4e14-9bda-af2b63916a11',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              },
              className: 'group-i2',
            },
            rect: {
              x: 301,
              y: 400,
              width: 55,
              height: 20,
            },
            children: [{
              componentName: 'Div',
              id: '3a377398-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: '5px',
                  width: '20px',
                  height: '20px',
                },
                className: 'view-2',
              },
              rect: {
                x: 301,
                y: 400,
                width: 20,
                height: 20,
              },
              selfId: '35628C0E-B278-4A22-9CF0-2B4ACAA14414',
              children: [{
                componentName: 'Image',
                id: '3a377397-a3db-11eb-b0cf-4750e157a51a',
                props: {
                  style: {
                    marginTop: '1px',
                    width: '17px',
                    height: '17px',
                  },
                  src: 'https://img.alicdn.com/imgextra/i4/O1CN01UHHWUq21uCYpwJ0jj_!!6000000007044-2-tps-36-36.png',
                  className: 'icon-share',
                },
                rect: {
                  x: 303,
                  y: 402,
                  width: 17,
                  height: 17,
                },
                selfId: '6CCA51F1-7341-4181-B591-DE02FF84AA55',
              }],
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'left',
                  },
                },
              },
            }, {
              componentName: 'Text',
              id: '3a377399-a3db-11eb-b0cf-4750e157a51a',
              props: {
                style: {
                  marginTop: '1px',
                  lineHeight: '11px',
                  whiteSpace: 'nowrap',
                  color: '#616770',
                  fontFamily: 'Helvetica',
                  fontSize: '11px',
                  fontWeight: 'normal',
                },
                text: 'Share',
                lines: 1,
                className: 'share',
              },
              rect: {
                x: 326,
                y: 403,
                width: 30,
                height: 15,
              },
              selfId: 'D44C7D24-52CA-415A-8167-9E845F57279C0',
              smart: {
                layerProtocol: {
                  layout: {
                    type: 'layout',
                    position: 'right',
                  },
                },
              },
            }],
            smart: {
              layerProtocol: {
                repeat: {
                  type: 'repeat',
                  repeatId: '1619144760103889',
                  repeatIndex: '2',
                },
                layout: {
                  type: 'layout',
                  position: 'right',
                },
              },
            },
          }],
          smart: {
            layerProtocol: {
              layout: {
                type: 'list',
                position: 'bottom',
                row: 3,
                col: 1,
              },
              component: {
                type: 'checkbox',
              },
            },
            nodeIdentification: {
              baseComponent: ['checkbox'],
            },
            nodeCustom: {
              baseComponent: {
                isConfident: true,
                label: 'checkbox',
                score: 0.9952711462974548,
                type: 'baseComponent',
                meta: {
                  threshold: 0.99,
                },
                rect: {
                  x: 65,
                  y: 400,
                  width: 291,
                  height: 20,
                },
                id: '37441839-900f-493e-b1d4-923e64dcff03',
                selfId: null,
              },
            },
          },
        }],
        smart: {
          layerProtocol: {
            layout: {
              type: 'layout',
              position: 'bottom',
            },
          },
        },
      }],
    }],
    smart: {
      layerProtocol: {
        repeat: {
          type: 'repeat',
          repeatId: '1619144760102413',
          repeatIndex: '0',
        },
      },
    },
    loop: '{{this.state.list}}',
  }],
  imgcook: {
    restore_id: '98b27d5f-3c9a-4228-a076-bcf6de526638',
  },
  state: {
    list: [{}, {}],
  },
};

@Module({
  name: 'builder',
  store,
  dynamic: true,
})
class Builder extends VuexModule {
  // public config: ComponentConfig = {
  //   componentName: 'Page',
  //   props: {},
  // };

  public id = 0;

  public builderState: {
    config: ComponentConfig | null,
    activeConfig: ComponentConfig | null,
    activeProps: Array<{
      prop: string,
      label: string,
      input: any,
    }>,
    activePath: string,
    activeId: number | null,
  } = {
    activeConfig: null,
    activeProps: [],
    config: null,
    activePath: '',
    activeId: null,
  }
  // public idConfigMap: {
  //   [key: string]: ComponentConfig
  // } = {}

  // public activeConfig: ComponentConfig = img;

  public propConfig: {
    [key: string]: Array<{
      prop: string,
      label: string,
      input: any,
    }>
  } = {
    Image: [
      {
        prop: 'src',
        label: 'Url',
        input: {
          component: 'InputExpression',
        },
      },
      {
        prop: 'title',
        label: 'Title',
        input: {
          component: 'InputExpression',
        },
      },
      {
        prop: 'href',
        label: 'Link',
        input: {
          component: 'InputExpression',
        },
      },
    ],
    Text: [
      {
        prop: 'text',
        label: 'Text',
        input: {
          component: 'InputExpression',
        },
      },
    ],
    ElButton: [
      {
        prop: 'size',
        label: 'Size',
        input: {
          component: 'Select',
          config: {
            options: [{
              value: 'medium',
            }, {
              value: 'small',
            }, {
              value: 'mini',
            }],
          },
        },
      },
      {
        prop: 'type',
        label: 'Type',
        input: {
          component: 'Select',
          config: {
            options: [{
              value: 'primary',
            }, {
              value: 'success',
            }, {
              value: 'warning',
            }, {
              value: 'danger',
            }, {
              value: 'info',
            }, {
              value: 'text',
            }],
          },
        },
      },
      {
        prop: 'round',
        label: 'Round',
        input: {
          component: 'Switch',
        },
      },
    ],
  }

  @Action
  listenPage() {
    window.addEventListener('message', (event) => {
      if (typeof event.data === 'string') {
        try {
          console.log(event);
          const data = JSON.parse(event.data);
          if (data.cmd === 'update-builder-config-by-page') {
            this.UPDATE_CONFIG(data.data);
          }
          if (data.cmd === 'selected-by-page') {
            this.SET_ACTIVE_BY_PATH(data.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  @Mutation
  GEN_ID() {
    this.id += 1;
    if (this.builderState.config) { this.builderState.config._currentId = this.id; }
  }

  @Mutation
  UPDATE_STYLE({ value, key }: {
    value: string,
    key: string,
  }) {
    if (this.builderState.activeConfig?.props.style) {
      this.builderState.activeConfig.props.style[key] = value;
    }
  }

  @Action
  updateStyle({ value, key }: {
    value: string,
    key: string,
  }) {
    this.UPDATE_STYLE({
      value,
      key,
    });
  }

  @Mutation
  UPDATE_STYLES(style: any) {
    if (this.builderState.activeConfig?.props) {
      this.builderState.activeConfig.props.style = style;
    }
  }

  @Action
  updateStyles(style: any) {
    this.UPDATE_STYLES(style);
  }

  // @Mutation
  // addToMap(c: ComponentConfig) {
  //   if (c._id) { this.idConfigMap[c._id] = c; }
  // }
  @Mutation
  SET_ACTIVE_PATH(path: string) {
    this.builderState.activePath = path;
  }

  @Mutation
  SET_ACTIVE_ID(id: number) {
    this.builderState.activeId = id;
  }

  // @Action
  // setActiveConfigById(id: number) {
  //   this.SET_ACTIVE_BY_ID(id);
  // }

  // @Mutation
  // SET_ACTIVE_BY_ID(path: string) {
  //   const activeConfig = jsonuri.get(this.builderState.config, this.builderState.activePath);
  //   if (activeConfig) activeConfig._active = false;
  //   this.builderState.activePath = path;
  //   const newActiveConfig = jsonuri.get(this.builderState.config, path);
  //   this.builderState.activeConfig = newActiveConfig;
  //   if (this.builderState.activeConfig?.componentName) {
  //     newActiveConfig._active = true;
  //     this.builderState.activeProps = this.propConfig[this.builderState.activeConfig?.componentName];
  //   }
  // }

  @Mutation
  UPDATE_CONFIG(componentConfig: ComponentConfig) {
    console.log(123123);
    this.builderState.config = componentConfig;
  }

  @Action
  setActiveConfigByPath(path: string) {
    this.SET_ACTIVE_BY_PATH(path);
  }

  @Mutation
  SET_ACTIVE_BY_PATH(path: string) {
    const activeConfig = jsonuri.get(this.builderState.config, this.builderState.activePath);
    if (activeConfig) activeConfig._active = false;
    this.builderState.activePath = path;
    const newActiveConfig = jsonuri.get(this.builderState.config, path);
    this.builderState.activeConfig = newActiveConfig;
    if (this.builderState.activeConfig?.componentName) {
      newActiveConfig._active = true;
      this.builderState.activeProps = this.propConfig[this.builderState.activeConfig?.componentName];
    }
  }

  @Action
  setActive(componentConfig: ComponentConfig) {
    if (componentConfig._id === 0) {
      this.SET_ACTIVE_BY_PATH('');
    } else {
      jsonuri.walk(this.builderState.config, (value, key, parent, { path }) => {
        console.log(value, path);

        if (value._id && value._id === componentConfig._id) {
          this.SET_ACTIVE_BY_PATH(path);
        }
      });
    }
  }

  @Mutation
  SET_ACTIVE(newActiveConfig: ComponentConfig) {
    if (this.builderState.activeConfig !== newActiveConfig) {
      if (this.builderState.activeConfig) {
        this.builderState.activeConfig._active = false;
      }

      this.builderState.activeConfig = newActiveConfig;
      if (this.builderState.activeConfig?.componentName) {
        newActiveConfig._active = true;
        this.builderState.activeProps = this.propConfig[this.builderState.activeConfig?.componentName];
      }

      jsonuri.walk(this.builderState.config, (value, key, parent, { path }) => {
        // console.log(value);
        if (value._id && value._id === newActiveConfig._id) {
          this.builderState.activePath = path;
        }
      });
    }
  }

  @Action({ rawError: true })
  public fetchConfig() {
    const travers = (c: ComponentConfig) => {
      c._id = this.id;
      // this.addToMap(c);
      this.GEN_ID();
      config._currentId = c._id;
      if (!c.props.style) {
        c.props.style = {};
      }
      c.children?.forEach((child: ComponentConfig) => travers(child));
      c.slots?.forEach((child: ComponentConfig) => travers(child));
    };
    travers(config);

    // console.log(config);
    this.UPDATE_CONFIG(config);
  }
}

export default getModule(Builder);
