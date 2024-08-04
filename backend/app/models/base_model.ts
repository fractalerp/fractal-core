export interface BaseDocument {
    created_at: Date;
    updated_at: Date;
    created_by_user_id: string;
    updated_by_user_id: string;
    created_by_user_full_name: string;
    updated_by_user_full_name: string;
    merchant_id: string;
}

export class BaseSchema {
    constructor() {
    }
}

