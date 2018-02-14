import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FileComponent } from './file.component';
import { FileDetailComponent } from './file-detail.component';
import { FilePopupComponent } from './file-dialog.component';
import { FileDeletePopupComponent } from './file-delete-dialog.component';

@Injectable()
export class FileResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const fileRoute: Routes = [
    {
        path: 'file',
        component: FileComponent,
        resolve: {
            'pagingParams': FileResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.file.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'file/:id',
        component: FileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.file.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filePopupRoute: Routes = [
    {
        path: 'file-new',
        component: FilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.file.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file/:id/edit',
        component: FilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.file.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file/:id/delete',
        component: FileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.file.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
