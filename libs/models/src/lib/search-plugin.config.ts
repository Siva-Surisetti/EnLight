export interface SearchApiPluginConfig {
  onRegister?: Function;
  getSearchResults: (
    config: {
      server: any;
      options: any;
      request: {
        params: {};
        query: any;
      };
      headers: any;
    },
    baseURL: string
  ) => Promise<any>;
}
