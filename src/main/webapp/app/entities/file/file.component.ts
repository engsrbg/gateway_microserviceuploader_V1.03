import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { File } from './file.model';
import { FileService } from './file.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { saveAs } from 'file-saver';
import { ButtonActionsComponent } from './file-actions.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnInit, OnDestroy {

    currentAccount: any;
    files: File[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    blob: any;

    source: any;

    // this is settings for smart tables
    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false
        },
        pager: {
            display: true,
            perPage: 5
        },
        columns: {
            id: {
                title: 'ID',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false,
            },
            name: {
                title: 'Name',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false
            },
            description: {
                title: 'Description',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false
            },
            fileSize: {
                title: 'File Size',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false,
            },
            format: {
                title: 'Format',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false,
            },
            dateCreated: {
                title: 'Date Created',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false,
                valuePrepareFunction: (date) => {
                    const raw = new Date(date);

                    const formatted = this.datePipe.transform(raw, 'dd-MM-yyyy');
                    return formatted;
                }
            },
            lastModified: {
                title: 'Last Modified',
                editable: false,
                sort: true,
                hideSubHeader: true,
                addable: false,
                valuePrepareFunction: (date) => {
                    const raw = new Date(date);

                    const formatted = this.datePipe.transform(raw, 'dd-MM-yyyy');
                    return formatted;
                }
            },
            actions: {
                title: 'Actions',
                filter: false,
                editable: false,
                sort: false,
                hideSubHeader: false,
                addable: false,
                searchable: false,
                type: 'custom',
                renderComponent: ButtonActionsComponent,
                onComponentInitFunction: (instance) => {
                    // parent listen event open from child and in that case parent will call openFile function
                    instance.open.subscribe((row) => {
                        this.openFile(row.contentContentType, row.content, row.id);
                    });
                    // parent listen event download from child and in that case parent will call downloadFile function
                    instance.download.subscribe((row) => {
                        this.downloadFile(row.contentContentType, row.content, row.name);
                    });
                }
            },
        }
    }
    // this above are settings for smart tables

    constructor(
        private fileService: FileService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private dataUtils: JhiDataUtils,
        private router: Router,
        private eventManager: JhiEventManager,
        private datePipe: DatePipe
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.fileService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/file'], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/file', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: File) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field, id) {
        if (contentType === 'application/pdf') {
            this.dataUtils.openFile(contentType , field);
        } else {
            this.fileService.find(id).subscribe(
                (res: File) => this.dataUtils.openFile(res.contentContentType, res.content),
                (res: File) => this.onError(res)
            );
        }
    }
    registerChangeInFiles() {
        this.eventSubscriber = this.eventManager.subscribe('fileListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.files = data;
        this.source = this.files;
    }
    private onOpenSuccess(data) {
        console.log(data);
        this.dataUtils.openFile(data.contentContentType , data.content);
        return data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    // Funtction for downloading diferent types of files. We call this function from button in html page like this:
    // downloadFile(file.contentContentType, file.content, file.name).
    downloadFile(contentType, content, fileName) {
        // decode base64 string, remove whitespaces to create clean and blob format
        const binary = atob(content.replace(/\s/g, ''));
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        // The Uint8Array typed array represents an array of 8-bit unsigned integers
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        // create the blob object with specific content-type
        this.blob = new Blob([view], { type: contentType });
        // we need to give clean blob file to function 'saveAs()' and file name to file which is going to be downloaded
        saveAs(this.blob, fileName);
    }
}
