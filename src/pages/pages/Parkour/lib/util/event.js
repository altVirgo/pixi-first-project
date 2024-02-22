const listeners = {}
const persistent = {}
const Event = {
  publish: (name, payload, async = false) => {
    const handlers = [...listeners[name] || [], ...persistent[name] || []]
    // console.info('publish ===> ' + name, payload,handlers,listeners)
    const call = () => {
      handlers.forEach(handler => {
        if (handler) {
          handler(payload)
        }
      })
    }
    if (async) {
      setTimeout(call)
    } else {
      call()
    }
  },
  register: (name, handler) => {
    let handlers = persistent[name]
    if (!handlers) {
      handlers = []
      persistent[name] = handlers
    }
    handlers.push(handler)
  },
  unregister: (name) => {
    persistent[name] = []
  },
  listen: (name, handler, discriminator = '') => {
    let handlers = listeners[name]
    handler.discriminator = discriminator
    if (!handlers) {
      handlers = []
      listeners[name] = handlers
    }
    handlers.push(handler)
  },
  listenAll: handlers => {
    Object.keys(handlers).forEach(name => {
      Event.listen(name, handlers[name])
    })
  },
  removeByDiscriminator: (name, discriminator) => {
    const handlers = listeners[name]
    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        const handler = handlers[i]
        if (handler && handler.discriminator === discriminator) {
          handlers[i] = null
        }
      }
    }
  },
  remove: (name, handler) => {
    const handlers = listeners[name]
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index >= 0) {
        handlers[index] = null
      }
    }
  },
  clear: name => {
    if (listeners[name]) {
      const listens = listeners[name]
      const newListens = []
      listens.forEach(handler => {
        if (handler && handler.discriminator) {
          newListens.push(handler)
        }
      })
      if (newListens.length > 0) {
        listeners[name] = newListens
      } else {
        delete listeners[name]
      }
    }
  },
  clearAll: () => {
    Object.keys(listeners).forEach(name => {
      Event.clear(name)
    })
  },
  listeners,
  persistent
}
export default Event
window.Event = Event
