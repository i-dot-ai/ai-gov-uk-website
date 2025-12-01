declare global {
  var AOS: {init: Function};
}

declare global {
  var $: any;
}

declare global {
  var posthog: {
    capture: (eventName: string, properties?: Record<string, any>) => void;
    init: (apiKey: string, options?: any) => void;
    // Add other methods as needed
  };
}

export {};