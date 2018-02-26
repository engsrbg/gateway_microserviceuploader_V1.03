import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonActionsComponent } from './file-actions.component';

import {
    FileService,
    FilePopupService,
    FileComponent,
    FileDetailComponent,
    FileDialogComponent,
    FilePopupComponent,
    FileDeletePopupComponent,
    FileDeleteDialogComponent,
    fileRoute,
    filePopupRoute,
    FileResolvePagingParams,

} from './';

const ENTITY_STATES = [
    ...fileRoute,
    ...filePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        Ng2SmartTableModule
    ],
    declarations: [
        FileComponent,
        FileDetailComponent,
        FileDialogComponent,
        FileDeleteDialogComponent,
        FilePopupComponent,
        FileDeletePopupComponent,
        ButtonActionsComponent
    ],
    entryComponents: [
        FileComponent,
        FileDialogComponent,
        FilePopupComponent,
        FileDeleteDialogComponent,
        FileDeletePopupComponent,
        ButtonActionsComponent
    ],
    providers: [
        FileService,
        FilePopupService,
        FileResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFileModule { }
