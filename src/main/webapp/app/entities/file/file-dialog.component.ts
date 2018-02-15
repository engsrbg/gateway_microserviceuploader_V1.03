import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { File } from './file.model';
import { FilePopupService } from './file-popup.service';
import { FileService } from './file.service';

@Component({
    selector: 'jhi-file-dialog',
    templateUrl: './file-dialog.component.html'
})
export class FileDialogComponent implements OnInit {

    file: File;
    isSaving: boolean;
    dateCreatedDp: any;
    lastModifiedDp: any;
    typeFinal: string;
    radioDisabled: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private fileService: FileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.radioDisabled = true;
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    setType(type: string) {
        this.typeFinal = type;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.file.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fileService.update(this.file));
        } else {
            this.subscribeToSaveResponse(
                this.fileService.create(this.file));
        }
    }

    private subscribeToSaveResponse(result: Observable<File>) {
        result.subscribe((res: File) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: File) {
        this.eventManager.broadcast({ name: 'fileListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-file-popup',
    template: ''
})
export class FilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filePopupService: FilePopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.filePopupService
                    .open(FileDialogComponent as Component, params['id']);
            } else {
                this.filePopupService
                    .open(FileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
