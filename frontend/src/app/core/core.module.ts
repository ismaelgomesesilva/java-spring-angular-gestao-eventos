import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/**
 * Core Module
 * 
 * Módulo singleton que contém serviços e configurações globais.
 * Deve ser importado apenas no AppModule (ou AppComponent standalone).
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado. Importe apenas no AppModule.');
    }
  }
}

