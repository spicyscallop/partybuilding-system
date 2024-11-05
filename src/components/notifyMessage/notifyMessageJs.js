import { createApp } from 'vue';
import Message from './notifyMessage.vue';

const MessagePlugin = {
    install(app) {
      app.config.globalProperties.$message = function (options) {
        const container = document.createElement('div');
        document.body.appendChild(container);
  
        const messageProps = {
          ...typeof options === 'string' ? { message: options } : options,
          close: () => {
            messageApp.unmount();
            document.body.removeChild(container);
          }
        };
  
        const messageApp = createApp(Message, messageProps);
        messageApp.mount(container);
      };
    }
  };

export default MessagePlugin;
