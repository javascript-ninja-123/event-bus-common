import {Subject} from "./subjects"




export interface EntityMovedEvent {
    subject: Subject.EntityUpdated;
    data:{
        entityId: string;
        entityURL: string;
        createdAt: string;
        updatedAt: string;
        version: number;
        uploaderId: string;
        prevPath: string;
        newPath: string;
    }
}