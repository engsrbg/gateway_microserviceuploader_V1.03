import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ViewCell } from 'ng2-smart-table';
import { saveAs } from 'file-saver'

// component for download button bellow
@Component({
    selector: 'jhi-button-download',
    templateUrl: './file-actions.component.html',
})
export class ButtonActionsComponent implements ViewCell, OnInit {
    renderValue: string;
    blob: any;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() open: EventEmitter<any> = new EventEmitter();
    @Output() download: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit() {

    }

    openFile(rowData) {
        this.open.emit(rowData);
    }
    downloadFile(rowData) {
        this.download.emit(rowData);
    }

}
