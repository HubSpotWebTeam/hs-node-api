export = HubSpotClient;

declare class HubSpotClient {
  constructor(props: HubSpotClient.IHubSpotClientProps);
  account: IAccountApi;
  calendar: any // ICalendarApi;
  contacts: any // IContactsApi;
  contactsLists: any // IContactsListsApi;
  contactsProperties: any // IContactsPropertiesApi
  company: any // ICompanyApi;
  blog: any // IBlogApi;
  workflows: any // IWorkflowsApi;
  files: any // IFilesApi;
  domains: any // IDomainsApi;
  layouts: ILayoutsApi;
  forms: any // IFormsApi;
  social: any // ISocialApi;
  emailEvents: any // IEmailEventsApi;
  deals: any // IDealsApi;
  pages: any // pagesApi;
  hubdb: any // hubdbApi;
  engagements: any // IEngagementsApi;

}

declare namespace HubSpotClient {
  export interface IHubSpotClientProps {
    hapikey?: string;
    accessToken?: string;
  }
}

interface IAccountApi {
  getAccountDetails: () => Promise<IAccountApi.IAccountDetails>;
  getDailyLimit: () => Promise<IAccountApi.IDailyLimit[]>;
}

declare namespace IAccountApi {
  interface IAccountDetails {
    portalId: number;
    timeZone: string;
    currency: string;
    utcOffsetMilliseconds: string;
    utcOffset: string;
  }

  interface IDailyLimit {
    name: string;
    usageLimit: number;
    currentUsage: number;
    collectedAt: number;
    fetchStatus: string;
    resetsAt: number;
  }
}

interface IBlogApi { 

}

interface ICalendarApi { 
 
}

interface IContactsApi { 
 
}

interface ICompanyApi { 
 
}

interface IWorkflowsApi { 
 
}

interface IFilesApi { 
 getFilesInFolder: (folderId: number, opts?: any) => Promise<{ limit: number; objects: any[]; }>;
 getFolders: (parentFolderId: number, opts?: any) => Promise<{ limit: number; objects: any[]; }>;
}

interface IDomainsApi { 
 
}

interface ILayoutsApi { 
 getLayouts: (opts?: ILayoutsApi.IGetLayoutOpts) => Promise<{ limit: number; objects: ILayoutsApi.ILayoutEntity[]; }>;
 getLayout: (layoutId: number) => Promise<ILayoutsApi.ILayoutEntity>;
 getLayoutBuffer: (layoutId: number) => Promise<ILayoutsApi.ILayoutEntity>;
 hasBufferedChanges: (layoutId: number) => Promise<{ has_changes: boolean }>;
 getPreviousLayoutVersions: (layoutId: number) => Promise<{ [index: string]: any}[]>
 getPreviousLayoutVersion: (opts: { id: number, versionId: number }) => Promise<{ [index: string]: any}[]>
}

declare namespace ILayoutsApi {
  interface IGetLayoutOpts {
    limit?: number;
    offset?: number;
    category_id?: number;
    created?: number;
    deleted_at?: number;
    id?: number;
    label?: string;
    path?: string;
    custom_head?: string;
    include_default_custom_css?: boolean;
    enable_domain_stylesheet?: boolean;
    attatched_stylesheets?: string;
  }

  interface ILayoutEntity {
    body_class: string;
    body_class_id: string;
    category_id: string;
    created: number;
    deleted_at: number;
    id: string;
    label: string;
    layout_data: string;
    path: string;
    updated: string;
    [index: string]: any;
  } 
}

interface IFormsApi { 
 
}

interface ISocialApi { 
 
}

interface IEmailEventsApi { 
 
}

interface IDealsApi { 
 
}

interface pagesApi { 
 
}

interface hubdbApi { 
 
}

interface IEngagementsApi { 
 
}
