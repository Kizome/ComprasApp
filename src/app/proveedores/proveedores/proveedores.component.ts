import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  paginaActual: number = 1;
  proveedores: any[] = [];

  constructor(private proveedoresService: ProveedoresService) {
    this.proveedoresService.getProveedores()
      .subscribe(proveedores => {
        for (const id$ in proveedores) {
          const p = proveedores[id$];
          p.id$ = id$;
          this.proveedores.push(proveedores[id$]);
        }
      })
  }

  ngOnInit() {

  }

  eliminarProveedor(id$) {
    this.proveedoresService.delProveedor(id$)
      .subscribe(res => {
        this.proveedores = [];
        this.proveedoresService.getProveedores()
          .subscribe(proveedores => {
            for (const id$ in proveedores) {
              const p = proveedores[id$];
              p.id$ = id$;
              this.proveedores.push(proveedores[id$]);
            }
          })
      });
  }

}
