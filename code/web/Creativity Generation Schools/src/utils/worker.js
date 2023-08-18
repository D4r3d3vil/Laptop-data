self.addEventListener('message', ({ data }) => {
    try {
      const result = eval(data);
      self.postMessage(result);
    } catch (e) {
      self.postMessage({ error: e.message });
    }
  });