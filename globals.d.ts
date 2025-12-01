declare global {
  var AOS: {init: Function};
}

declare global {
  var $: any;
}

declare global {
  var posthog: {
    capture: (eventName: string, properties?: Record<string, any>) => void;
  };
}

export {};
