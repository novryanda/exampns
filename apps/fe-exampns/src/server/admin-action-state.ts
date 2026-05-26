export interface AdminActionState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialAdminActionState: AdminActionState = {
  status: "idle",
  message: "",
};

export interface CreateTryoutActionState extends AdminActionState {
  createdId?: string;
}

export const initialCreateTryoutActionState: CreateTryoutActionState = {
  status: "idle",
  message: "",
};

export interface ResourceActionState extends AdminActionState {
  resourceId?: string;
}

export const initialResourceActionState: ResourceActionState = {
  status: "idle",
  message: "",
};
