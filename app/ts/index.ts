/**
 * Created by Administrator on 2016/9/29.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode,ApplicationRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';
import { AppComponent } from './views/test/index';
import { AppComponent1 } from './views/test1/index';

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
    constructor(public appRef:ApplicationRef) {
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

if (process.env.ENV === 'build') {
    enableProdMode();
}

export function main() {
    //noinspection TypeScriptValidateTypes
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}







