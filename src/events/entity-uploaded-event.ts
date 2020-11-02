import {Subject} from "./subjects"




export interface EntityUploadedEvent {
    subject: Subject.EntityUploaded;
    data:{
        entityId: string;
        entityURL: string;
        createdAt: string;
        version: number;
        uploaderId: string;
        path: string;
    }
}