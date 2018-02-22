import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonDeleteComponent } from './file-actions.component';
import { ButtonOpenComponent } from './file-actions.component';
import { ButtonEditComponent } from './file-actions.component';
import { ButtonDetailsComponent } from './file-actions.component';
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
        ButtonDeleteComponent,
        ButtonOpenComponent,
        ButtonEditComponent,
        ButtonDetailsComponent
    ],
    entryComponents: [
        FileComponent,
        FileDialogComponent,
        FilePopupComponent,
        FileDeleteDialogComponent,
        FileDeletePopupComponent,
        ButtonDeleteComponent,
        ButtonOpenComponent,
        ButtonEditComponent,
        ButtonDetailsComponent
    ],
    providers: [
        FileService,
        FilePopupService,
        FileResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFileModule { }
