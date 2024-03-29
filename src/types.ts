export type Item = Record<string, any>;

export type Items = Item[];

// Index
export type AdminIndexOptions = {
  entityCounts: Record<string, number | string>;
};

export type AdminIndexServerSideProperties = {
  params: {};
};

// Create
export type AdminEntityCreateOptions = {
  item: Record<string, any>;
  entity: string;
};

export type AdminEntityCreateServerSideProperties = {
  params: {
    entity: string;
  };
};

// Edit
export type AdminEntityEditOptions = {
  item: Record<string, any>;
  entity: string;
};

export type AdminEntityEditServerSideProperties = {
  params: {
    id: string;
    entity: string;
  };
};

// List
export type AdminEntityListOptions = {
  items: Items;
  entity: string;
};

export type AdminEntityListServerSideProperties = {
  params: {
    entity: string;
  };
};

// Read
export type AdminEntityReadOptions = {
  item: Item;
  entity: string;
};

export type AdminEntityReadParameters = {
  id: string;
  entity: string;
};

export type AdminEntityReadServerSideProperties = {
  params: AdminEntityReadParameters;
};