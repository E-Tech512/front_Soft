import { Routes } from '@angular/router';
import { SalidasComponent } from './modules/panel/pages/salidas/salidas.component';
import { ProductoComponent } from './modules/panel/pages/producto/producto.component';
import { PanelComponent } from './modules/panel/panel.component';
import { EntradasComponent } from './modules/panel/pages/entradas/entradas.component';

export const routes: Routes = [
    {
        path:'',
        component:PanelComponent,
        children:[
            {
                path:'salidas',
                component:SalidasComponent
            },
            {
                path:'productos',
                component:ProductoComponent
            },
            {
                path:'entradas',
                component:EntradasComponent
            }
        ]
    }
];
