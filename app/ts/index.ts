/**
 * Created by Administrator on 2016/9/29.
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode, ApplicationRef} from '@angular/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {removeNgStyles, createNewHosts, bootloader} from '@angularclass/hmr';
import {AppComponent} from './views/test';
import {AppComponent1} from './views/test1';

import '../style/fonts.less'
import '../style/common.less'

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        AppComponent1
    ],
    bootstrap: [AppComponent]
})
class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

bootloader(main);







