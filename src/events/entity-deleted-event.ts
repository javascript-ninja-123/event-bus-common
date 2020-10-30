import {Subject} from "./subjects"




export interface EntityDeletedEvent {
    subject: Subject.EntityUpdated;
    data:{
        entityId: string;
        createdAt: string;
        deltedAt: string;
        version: number;
        uploaderId: string;
        path: string;
    }
}